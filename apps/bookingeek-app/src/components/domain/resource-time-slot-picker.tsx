import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  Resource,
  getTimeStringFromMinutes,
  TimeRange,
} from "@bookingeek/core";
import OptionButton from "../common/option-button";

const customFormatTime = (minutes: number) =>
  getTimeStringFromMinutes(minutes, "hh:mm aaa");

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const StyledEmptyTimesLabel = styled.p`
  font-style: italic;
  font-weight: 500;
  text-align: center;
  margin: 24px 16px;
  line-height: 24px;
`;

type ResourceTimeSlotPickerProps = {
  selectedTime: { startMinutes: number; endMinutes: number } | null;
  setSelectedTime: (time: { startMinutes: number; endMinutes: number }) => void;
  resource: Resource<string>;
  availableRules: Array<TimeRange>;
};

/**
 * Displays the calendar picker and time pickers at reservation form date/time select step.
 */
export default function ResourceTimeSlotPicker({
  selectedTime,
  setSelectedTime,
  resource,
  availableRules,
}: ResourceTimeSlotPickerProps) {
  const availableSlots = availableRules.map((rule, index) => ({
    label: `${customFormatTime(rule.startTimeInMinutesPastMidnight)} - ${customFormatTime(rule.endTimeInMinutesPastMidnight)}`,
    value: index,
    // Added to make it trackable
    startMinutes: rule.startTimeInMinutesPastMidnight,
    endMinutes: rule.endTimeInMinutesPastMidnight,
  }));
  // Index of selected slot, from the availableSlots variable
  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState<number>(
    selectedTime && resource.reservationTimeType === "slots"
      ? availableSlots.findIndex(
          (slot) => selectedTime.startMinutes === slot.startMinutes
        )
      : -1
  );

  // Calls the setSelectedTime prop function every time the selected time slot index change
  useEffect(() => {
    if (availableSlots.length && selectedTimeSlotIndex >= 0) {
      const startMinutes = availableSlots[selectedTimeSlotIndex].startMinutes;
      const endMinutes = availableSlots[selectedTimeSlotIndex].endMinutes;
      if (startMinutes !== null && endMinutes !== null) {
        setSelectedTime({ startMinutes, endMinutes });
      }
    }
  }, [selectedTimeSlotIndex]);

  return (
    <StyledContainer>
      {availableSlots.length ? (
        availableSlots.map((slot, index) => (
          <StyledContainer>
            <OptionButton
              key={slot.value}
              onClick={() => setSelectedTimeSlotIndex(index)}
              selected={selectedTimeSlotIndex === index}
            >
              {slot.label}
            </OptionButton>
          </StyledContainer>
        ))
      ) : (
        <StyledEmptyTimesLabel>
          There are no available time slots for the selected day.
        </StyledEmptyTimesLabel>
      )}
    </StyledContainer>
  );
}
