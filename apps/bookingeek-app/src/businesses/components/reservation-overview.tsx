import FormHeader from "../../common/components/form-header/form-header";
import styled from "styled-components";
import { format } from "date-fns";
import { RESOURCE_ICON } from "../../resources/data/resource-icons";
import ClockIcon from "../../common/icons/clock/clock";
import CalendarIcon from "../../common/icons/calendar/calendar";
import PlaceIcon from "../../common/icons/place/place";
import { ReservationFormSteps } from "../types/reservation-form-steps";
import { Resource, Business } from "@bookingeek/core";

const StyledContainer = styled.div<{ currentStep: ReservationFormSteps }>`
  display: ${(props) =>
    props.currentStep === "confirmation" ? "flex" : "none"};
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledInfoEntry = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  padding: 0 8px;
`;

const StyledIconContainer = styled.div`
  background: #c6c6c6;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ReservationOverviewProps = {
  selectedResource: Resource<string>;
  selectedDate: Date | null;
  selectedTime: {
    startMinutes: number;
    endMinutes: number;
  } | null;
  showAddress: boolean;
  business: Business<string>;
  currentStep: ReservationFormSteps;
};

export default function ReservationOverview({
  selectedDate,
  selectedResource,
  selectedTime,
  showAddress,
  business,
  currentStep,
}: ReservationOverviewProps) {
  return (
    <StyledContainer currentStep={currentStep}>
      <FormHeader>Reservation overview</FormHeader>
      <StyledInfoEntry>
        {selectedResource.picture.src ? (
          <StyledIconContainer>
            {RESOURCE_ICON("inherit", 24)[selectedResource.picture.icon]}
          </StyledIconContainer>
        ) : (
          <img
            src={selectedResource.picture.src}
            alt={selectedResource.title}
          />
        )}
        <p style={{ fontWeight: 500 }}>{selectedResource.title}</p>
      </StyledInfoEntry>
      <StyledInfoContainer>
        {selectedDate ? (
          <StyledInfoEntry>
            <CalendarIcon />
            <p>{format(selectedDate, "MMMM dd, yyyy")}</p>
          </StyledInfoEntry>
        ) : null}
        {selectedTime ? (
          <StyledInfoEntry>
            <ClockIcon />
            <p>
              {getTimeStringFromMinutes(selectedTime.startMinutes, "H:mm") +
                " - " +
                getTimeStringFromMinutes(selectedTime.endMinutes, "H:mm")}
            </p>
          </StyledInfoEntry>
        ) : null}
        {showAddress && business.address ? (
          <StyledInfoEntry>
            <PlaceIcon />
            <p>{business.address}</p>
          </StyledInfoEntry>
        ) : null}
      </StyledInfoContainer>
    </StyledContainer>
  );
}
