import { useParams } from "react-router";
import { useGetReservationsQuery } from "../reservations-api";
import NotFoundPage from "../../common/pages/not-found";
import styled from "styled-components";
import { useGetBusinessByIdQuery } from "../../businesses/businesses-api";
import { useGetResourcesQuery } from "../../resources/resources-api";
import BusinessOverview from "../../businesses/components/business-overview";
import ReservationOverview from "../../businesses/components/reservation-overview";
import { getDateFromDateDef } from "@bookingeek/core";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 24px;
  margin: auto;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: center;
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 400;
`;

const StyledSubtitle = styled.p`
  font-size: 16px;
  text-align: center;
`;

const StyledDivider = styled.div`
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;

const StyledReservationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export default function ReservationDetailsPage() {
  const { reservationId } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const justDone = urlParams.get("justDone") === "true";
  const { isLoading: reservationIsLoading, data: reservations } =
    useGetReservationsQuery({ _id: reservationId! });
  const reservation = reservations ? reservations[0] : undefined;
  const { isLoading: resourceIsLoading, data: resources } =
    useGetResourcesQuery({ _id: reservation?.resourceId });
  const resource = resources ? resources[0] : undefined;
  const { isLoading: businessIsLoading, data: business } =
    useGetBusinessByIdQuery(resource?.businessId || "");
  const isLoading =
    reservationIsLoading || resourceIsLoading || businessIsLoading;
  const everythingIsFound = reservation && resource && business;

  const reservationTimeDef =
    reservation?.startTimeInMinutesPastMidnight &&
    reservation.endTimeInMinutesPastMidnight
      ? {
          startMinutes: reservation.startTimeInMinutesPastMidnight,
          endMinutes: reservation.endTimeInMinutesPastMidnight,
        }
      : null;

  return isLoading ? (
    <>Loading...</>
  ) : !everythingIsFound ? (
    <NotFoundPage />
  ) : (
    <StyledContainer>
      <StyledImage src="/phone-confirmed.svg" alt="Confirmed" />
      {justDone ? <StyledTitle>All done!</StyledTitle> : null}
      <StyledSubtitle>
        {/* TODO: reservation confirmation should depend on payment status if online checkout is chosen */}
        {justDone
          ? "Your booking is confirmed. Check your e-mail for the receipt."
          : "Your reservation is confirmed."}
      </StyledSubtitle>
      <StyledDivider />
      <StyledReservationDetails>
        <BusinessOverview business={business} />
        <ReservationOverview
          business={business}
          currentStep="confirmation"
          selectedDate={getDateFromDateDef(reservation.startDate)}
          selectedResource={resource}
          selectedTime={reservationTimeDef}
          showAddress
        />
      </StyledReservationDetails>
    </StyledContainer>
  );
}
