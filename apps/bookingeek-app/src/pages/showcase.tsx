import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useGetResourcesQuery } from "../store/resources-api";
import ResourceItem from "../components/domain/resource-item";
import DateTimeSelectStep from "../components/domain/date-time-select-step";
import { useCreateReservationMutation } from "../store/reservations-api";
import ExtraDataStep from "../components/domain/extra-data-step";
import { useAppDispatch } from "../store/store";
import {
  genericDialogClosed,
  genericDialogShown,
  toastNotificationShown,
} from "../store/common-slice";
import PaymentTypeStep from "../components/domain/payment-type-step";
import ConfirmationStep from "../components/domain/confirmation-step";
import {
  Reservation,
  Resource,
  ResourceExtraField,
  CreateReservationPayload,
} from "@bookingeek/core";
import CheckoutStep from "../components/domain/checkout-step";
import { useGetBusinessByIdQuery } from "../store/businesses-api";
import { ReservationFormSteps } from "../types/reservation-form-steps";
import Button from "../components/common/button";
import BusinessOverview from "../components/domain/business-overview";
import ReservationOverview from "../components/domain/reservation-overview";
import { getDateDefFromDate } from "../helpers/get-date-def-from-date";
import NotFoundPage from "./not-found";

const StyledShowcasePage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledResourcesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeadingText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const buildFormFromExtraFields = (
  extraFields: Array<ResourceExtraField>
): Record<string, string> =>
  extraFields.reduce(
    (acc, extraField) => ({
      ...acc,
      [extraField.title]:
        extraField.type === "options-radio" ||
        extraField.type === "options-select"
          ? extraField.options![0]
          : "",
    }),
    {}
  );

export default function BusinessShowcasePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createReservation, createReservationData] =
    useCreateReservationMutation();
  const isCreatingReservation = createReservationData.isLoading;
  const { businessId } = useParams();
  const { data: business, isLoading: isLoadingBusiness } =
    useGetBusinessByIdQuery(businessId!);
  const [currentStep, setCurrentStep] =
    useState<ReservationFormSteps>("dateTimeSelect");
  const [createdReservation, setCreatedReservation] =
    useState<Reservation<string> | null>(null);

  const resourcesApi = useGetResourcesQuery({ businessId });
  const [selectedResource, setSelectedResource] =
    useState<Resource<string> | null>(null);
  // Reservation form fields
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<{
    startMinutes: number;
    endMinutes: number;
  } | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [checkoutTypeChosen, setCheckoutTypeChosen] = useState<
    "online" | "in-loco" | null
  >(null);
  const [extraDataForm, setExtraDataForm] = useState<
    Record<string, string | boolean>
  >({});

  // Builds extraFieldForm's initial value every time selectedResource changes
  useEffect(() => {
    if (selectedResource) {
      setExtraDataForm(buildFormFromExtraFields(selectedResource.extraFields));
    }
  }, [selectedResource]);

  // Redirects to 404 page if business could not be found
  const businessNotFound = !business && !isLoadingBusiness;

  // Called after checkout is completed (if paying online) or after confirmation step
  const onCreateReservation = async () => {
    const createReservationDto: CreateReservationPayload = {
      checkoutOptionChosen: checkoutTypeChosen!,
      customerData: {
        email: customerEmail,
        fullName: customerName,
      },
      startDate: getDateDefFromDate(selectedDate!),
      endDate: getDateDefFromDate(selectedDate!),
      startTimeInMinutesPastMidnight: selectedTime!.startMinutes,
      endTimeInMinutesPastMidnight: selectedTime!.endMinutes,
      extraFields: extraDataForm,
      resourceId: selectedResource!._id,
    };
    const { data: reservation, error } =
      await createReservation(createReservationDto);
    if (error) {
      console.log(error);
      dispatch(
        toastNotificationShown({
          message:
            "A problem occured while creating your reservation. Please refresh the page and try again.",
          type: "error",
        })
      );
    } else if (reservation) {
      setCreatedReservation(reservation);
      if (checkoutTypeChosen === "in-loco") {
        navigate(`/reservation/${reservation._id}?justDone=true`);
      } else {
        setCurrentStep("checkout");
      }
    }
  };

  // TODO: save reservation form in cookie so it can be restored (remove it after reservation is done)
  const beforeResetForm = () => {
    dispatch(
      genericDialogShown({
        title: "Go Back",
        body: `Going back will reset all your choices. Are you sure?`,
        actions: (
          <>
            <Button
              onClick={() => dispatch(genericDialogClosed())}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={onResetForm}>
              Go Back
            </Button>
          </>
        ),
      })
    );
  };

  const onResetForm = () => {
    setSelectedResource(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerName("");
    setCustomerEmail("");
    setCurrentStep("dateTimeSelect");
    dispatch(genericDialogClosed());
  };

  const onNextStepClick = () => {
    switch (currentStep) {
      case "dateTimeSelect":
        setCurrentStep("extraData");
        break;
      case "extraData":
        if (selectedResource?.checkoutType === "in-loco-online") {
          if (business?.stripeConnectedAccountId) {
            setCurrentStep("paymentType");
          }
          // If business has no Stripe account yet, sets checkout type as 'in-loco'
          else {
            setCheckoutTypeChosen("in-loco");
            setCurrentStep("confirmation");
          }
        } else {
          setCheckoutTypeChosen(
            selectedResource?.checkoutType === "in-loco-only"
              ? "in-loco"
              : "online"
          );
          setCurrentStep("confirmation");
        }
        break;
      case "paymentType":
        setCurrentStep("confirmation");
        break;
      case "confirmation":
        onCreateReservation();
        break;
    }
  };

  const onPrevStepClick = () => {
    switch (currentStep) {
      case "dateTimeSelect":
        beforeResetForm();
        break;
      case "extraData":
        setCurrentStep("dateTimeSelect");
        break;
      case "paymentType":
        setCurrentStep("extraData");
        break;
      case "confirmation":
        if (selectedResource?.checkoutType === "in-loco-online") {
          setCurrentStep("paymentType");
        } else {
          setCurrentStep("extraData");
        }
        break;
      case "checkout":
        setCurrentStep("confirmation");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "dateTimeSelect":
        return (
          <DateTimeSelectStep
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            currentStep={currentStep}
            onNextClick={onNextStepClick}
            onBackClick={onPrevStepClick}
            resource={selectedResource!}
          />
        );
      case "extraData":
        return (
          <ExtraDataStep
            customerEmail={customerEmail}
            customerName={customerName}
            setCustomerEmail={setCustomerEmail}
            setCustomerName={setCustomerName}
            extraFields={selectedResource!.extraFields}
            extraDataForm={extraDataForm}
            setExtraDataForm={setExtraDataForm}
            onNextClick={onNextStepClick}
            onBackClick={onPrevStepClick}
          />
        );
      case "paymentType":
        return (
          <PaymentTypeStep
            value={checkoutTypeChosen}
            onChange={setCheckoutTypeChosen}
            onNextClick={onNextStepClick}
            onBackClick={onPrevStepClick}
          />
        );
      case "confirmation":
        return (
          <ConfirmationStep
            checkoutTypeChosen={checkoutTypeChosen!}
            customerEmail={customerEmail}
            customerName={customerName}
            extraData={extraDataForm}
            isCreatingReservation={isCreatingReservation}
            onBackClick={onPrevStepClick}
            onNextClick={onNextStepClick}
          />
        );
      case "checkout":
        return createdReservation?.checkoutSessionClientSecret ? (
          <CheckoutStep
            clientSecret={createdReservation.checkoutSessionClientSecret}
          />
        ) : (
          <>Loading...</>
        );
    }
  };

  return isLoadingBusiness ? (
    <>Loading...</>
  ) : businessNotFound ? (
    <NotFoundPage />
  ) : (
    <StyledShowcasePage>
      {currentStep === "confirmation" ? (
        <StyledHeadingText>Review your reservation:</StyledHeadingText>
      ) : null}
      <BusinessOverview business={business!} />
      {selectedResource ? (
        <>
          <ReservationOverview
            selectedResource={selectedResource}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            business={business!}
            showAddress={currentStep === "confirmation"}
            currentStep={currentStep}
          />
          {renderCurrentStep()}
        </>
      ) : (
        <StyledResourcesList>
          {resourcesApi.isLoading ? (
            <>Loading reosurces...</>
          ) : resourcesApi.data?.length ? (
            resourcesApi.data.map((resource) => (
              <ResourceItem
                key={resource._id}
                title={resource.title}
                picture={resource.picture}
                priceInCents={resource.priceInCents}
                priceTypeMinutes={resource.priceTypeMinutes}
                description={resource.description}
                subtitle={resource.subtitle}
                onClick={() => setSelectedResource(resource)}
              />
            ))
          ) : (
            <p>No resources</p>
          )}
        </StyledResourcesList>
      )}
    </StyledShowcasePage>
  );
}
