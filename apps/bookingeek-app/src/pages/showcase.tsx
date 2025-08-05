import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  useGetResourcesQuery,
  useLazyGetResourceMonthAvailabilityQuery,
} from "../store/resources-api";
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
  ResourceExtraField,
  CreateReservationPayload,
  TimeRange,
  DayOfWeekAvailability,
} from "@bookingeek/core";
import CheckoutStep from "../components/domain/checkout-step";
import { useGetBusinessByIdOrSlugQuery } from "../store/businesses-api";
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

const StyledEmptyResourcesLabel = styled.p`
  margin-top: 24px;
  text-align: center;
  padding: 0px 16px;
  font-size: 20px;
`;

const StyledEmptyResourcesImage = styled.img`
  width: 100%;
  max-width: 180px;
  margin: 48px auto 24px auto;
  @media screen and (min-width: 768px) {
    max-width: 320px;
  }
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
  const params = useParams();
  const { resourceIdOrSlug } = params;
  const [createReservation, createReservationData] =
    useCreateReservationMutation();
  const isCreatingReservation = createReservationData.isLoading;
  const { businessIdOrSlug } = useParams();
  const { data: business, isLoading: isLoadingBusiness } =
    useGetBusinessByIdOrSlugQuery(businessIdOrSlug!);
  const [currentStep, setCurrentStep] =
    useState<ReservationFormSteps>("dateTimeSelect");
  const [createdReservation, setCreatedReservation] =
    useState<Reservation<string> | null>(null);

  const { data: resources, isLoading: isLoadingResources } =
    useGetResourcesQuery({ businessId: business?._id || "undefined" });
  const activeResources = resources?.filter((resource) => resource.isActive);
  const selectedResource = resources?.find(
    (resource) =>
      resource._id === resourceIdOrSlug || resource.slug === resourceIdOrSlug
  );
  const selectedResourceNotFound =
    business && resourceIdOrSlug && !selectedResource;
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

  // Every time selectedResource changes
  useEffect(() => {
    const load = async () => {
      if (selectedResource) {
        // Builds extraFieldForm's initial value
        setExtraDataForm(
          buildFormFromExtraFields(selectedResource.extraFields)
        );
      }
    };
    load();
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
      startTimeInMinutesPastMidnight: selectedTime?.startMinutes || null,
      endTimeInMinutesPastMidnight: selectedTime?.endMinutes || null,
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

  const onResetForm = () => {
    dispatch(genericDialogClosed());
    navigate(`/b/${business!.slug}`);
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
        if (
          selectedResource?.checkoutType === "in-loco-online" &&
          business?.stripeConnectedAccountId
        ) {
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
  ) : businessNotFound || selectedResourceNotFound ? (
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
          {isLoadingResources ? (
            <>Loading reosurces...</>
          ) : activeResources?.length ? (
            activeResources.map((resource) => (
              <ResourceItem
                key={resource._id}
                isActive={resource.isActive}
                title={resource.title}
                picture={resource.picture}
                priceInCents={resource.priceInCents}
                priceTypeMinutes={resource.priceTypeMinutes}
                description={resource.description}
                subtitle={resource.subtitle}
                onClick={() =>
                  navigate(`/b/${business!.slug}/${resource.slug}`)
                }
              />
            ))
          ) : (
            <>
              <StyledEmptyResourcesImage src="/no-resources.svg" />
              <StyledEmptyResourcesLabel>
                This business has no active resources yet.
              </StyledEmptyResourcesLabel>
            </>
          )}
        </StyledResourcesList>
      )}
    </StyledShowcasePage>
  );
}
