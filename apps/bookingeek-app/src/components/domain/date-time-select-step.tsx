import styled from "styled-components";

import ResourceTimePicker from "./resource-timer-picker";
import { ReservationFormSteps } from "../../types/reservation-form-steps";
import { Resource } from "@bookingeek/core";
import Button from "../common/button";
import CalendarPicker from "../common/calendar-picker";
import FormHeader from "../common/form-header";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const StyledDateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 32px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

type DateSelectStepProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  selectedTime: {
    startMinutes: number;
    endMinutes: number;
  } | null;
  currentStep: ReservationFormSteps;
  setSelectedTime: (
    time: { startMinutes: number; endMinutes: number } | null
  ) => void;
  onNextClick: () => void;
  onBackClick: () => void;
  resource: Resource<string>;
};

export default function DateTimeSelectStep({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  currentStep,
  resource,
  onNextClick,
  onBackClick,
}: DateSelectStepProps) {
  const canGoToNextStep = Boolean(selectedDate) && Boolean(selectedTime);

  // Shortcuts if current step is != 'dateTimeSelect'
  if (currentStep !== "dateTimeSelect") {
    return;
  }

  return (
    <StyledContainer>
      <FormHeader>
        {!Boolean(selectedDate)
          ? !Boolean(selectedTime)
            ? "Pick a date"
            : "Pick a time"
          : "Pick a time"}
      </FormHeader>
      <StyledDateTimeContainer>
        {/* TODO: pass availableDates prop to CalendarPicker. They'll likely come from the server. */}
        <CalendarPicker value={selectedDate} onChange={setSelectedDate} />
        {selectedDate ? (
          <ResourceTimePicker
            selectedDate={selectedDate}
            resource={resource}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        ) : null}
      </StyledDateTimeContainer>
      <StyledButtonsContainer>
        <Button onClick={onBackClick} variant="secondary">
          Back
        </Button>
        <Button disabled={!canGoToNextStep} onClick={onNextClick}>
          Next
        </Button>
      </StyledButtonsContainer>
    </StyledContainer>
  );
}
