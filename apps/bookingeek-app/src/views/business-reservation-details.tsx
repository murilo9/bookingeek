import styled from "styled-components";
import { useGetResourcesQuery } from "../store/resources-api";
import {
  getDateFromDateDef,
  getTimeStringFromMinutes,
  Reservation,
} from "@bookingeek/core";
import { useOutletContext } from "react-router";
import { format } from "date-fns";
import CalendarIcon from "../components/icons/calendar/calendar";
import ClockIcon from "../components/icons/clock/clock";
import Button from "../components/common/button";
import { formatPriceInCents } from "../helpers/format-price-in-cents";

const StyledReservationDetails = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 16px;
`;

const StyledInfoEntry = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const StyledInfoEntryText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #666666;
`;

const StyledIssuedAtLabel = styled.p`
  font-size: 14px;
  font-style: italic;
  color: #666666;
`;

const StyledDataEntryTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const StyledDataEntryValue = styled.p`
  font-size: 14px;
`;

const StyledCancellationLabelTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #b80101;
`;

const StyledCancellationLabelSubtitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #b80101;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export default function BusinessReservationDetailsView() {
  const reservation = useOutletContext<Reservation<string>>();
  const { data, isLoading: isLoadingResource } = useGetResourcesQuery({
    _id: reservation.resourceId,
  });
  const resource = data?.length ? data[0] : undefined;
  const resourceIsDateOnly = resource?.availabilityType === "date-only";
  const paymentIsDone = reservation.paymentStatus === "success";
  const { refundedAmountInCents, totalPriceInCents } = reservation;
  const totallyRefunded = refundedAmountInCents === totalPriceInCents;

  const dataEntries = [
    { title: "Name", value: reservation.customerData.fullName },
    { title: "E-mail", value: reservation.customerData.email },
    ...Object.entries(reservation.extraFields).map(([key, value]) => ({
      title: key,
      value,
    })),
  ];

  const renderCancellationLabel = () =>
    reservation.cancelledBy ? (
      <div>
        <StyledCancellationLabelTitle>
          {reservation.cancelledBy === "customer"
            ? "Cancelled by customer"
            : "Cancelled by us"}
        </StyledCancellationLabelTitle>
        <StyledCancellationLabelSubtitle>
          {refundedAmountInCents
            ? `Refunded $ ${formatPriceInCents(refundedAmountInCents)} / ${formatPriceInCents(totalPriceInCents)}`
            : "Not refunded"}
        </StyledCancellationLabelSubtitle>
      </div>
    ) : null;

  const renderActionButtons = () =>
    reservation.cancelledBy === null ? (
      <>
        <Button variant="secondary">
          Change Date{resourceIsDateOnly ? "" : "/Time"}
        </Button>
        <Button variant="danger">Cancel Reservation</Button>
      </>
    ) : paymentIsDone ? (
      <Button variant="secondary" disabled={totallyRefunded}>
        {totallyRefunded ? "Totally Refunded" : "Refund Reservation"}
      </Button>
    ) : null;

  return isLoadingResource ? (
    <>Loading resource...</>
  ) : resource ? (
    <>
      <StyledReservationDetails>
        <StyledHeader>
          <StyledTitle>{resource.title}</StyledTitle>
          <StyledInfoContainer>
            <StyledInfoEntry>
              <CalendarIcon color="#666666" />
              <StyledInfoEntryText>
                {format(
                  getDateFromDateDef(reservation.startDate),
                  "MMM dd, yyyy"
                )}
              </StyledInfoEntryText>
            </StyledInfoEntry>
            <StyledInfoEntry>
              <ClockIcon color="#666666" />
              <StyledInfoEntryText>
                {getTimeStringFromMinutes(
                  reservation.startTimeInMinutesPastMidnight,
                  "hh:mm"
                )}
              </StyledInfoEntryText>
            </StyledInfoEntry>
          </StyledInfoContainer>
        </StyledHeader>
        <StyledIssuedAtLabel>
          Issued at {format(reservation.created, "MMMM dd, H:mm")}
        </StyledIssuedAtLabel>
        {dataEntries.map(({ title, value }) => (
          <div>
            <StyledDataEntryTitle>{title}</StyledDataEntryTitle>
            <StyledDataEntryValue>{value}</StyledDataEntryValue>
          </div>
        ))}
        {renderCancellationLabel()}
        <StyledButtonsContainer>{renderActionButtons()}</StyledButtonsContainer>
      </StyledReservationDetails>
    </>
  ) : (
    <>Could not load resource</>
  );
}
