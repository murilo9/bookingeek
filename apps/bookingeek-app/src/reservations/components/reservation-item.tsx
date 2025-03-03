import styled from "styled-components";
import CalendarIcon from "../../common/icons/calendar/calendar";
import ClockIcon from "../../common/icons/clock/clock";
import {
  getDateFromDateDef,
  getTimeStringFromMinutes,
  Reservation,
} from "@bookingeek/core";
import { useGetResourcesQuery } from "../../resources/resources-api";
import { format } from "date-fns";

const StyledReservationItem = styled.div<{ clickable?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid #cccccc;
  padding: 16px 8px;
  cursor: ${(props) => (props.clickable ? "pointer" : "normal")};
  &:hover {
    background: ${(props) => (props.clickable ? "#f8f8f8" : "transparent")};
  }

  @media screen and (min-width: 768px) {
    padding: 16px;
  }
`;

const StyledTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const StyledSubtitle = styled.p`
  font-size: 14px;
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

type ReservationItemProps = {
  reservation: Reservation<string>;
  clickable?: boolean;
  onClick?: () => void;
};

export default function ReservationItem({
  reservation,
  clickable,
  onClick,
}: ReservationItemProps) {
  const { data, isLoading } = useGetResourcesQuery({
    _id: reservation.resourceId,
  });
  const resource = data?.length ? data[0] : undefined;

  return (
    <StyledReservationItem clickable={clickable}>
      {resource ? (
        <>
          <div>
            <StyledTitle>{resource.title}</StyledTitle>
            <StyledSubtitle>{reservation.customerData.fullName}</StyledSubtitle>
          </div>
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
        </>
      ) : (
        "Loading..."
      )}
    </StyledReservationItem>
  );
}
