import styled from "styled-components";
import FormField from "../common/form-field";
import { useEffect, useState } from "react";
import { getTimesList } from "../../helpers/get-times-list";
import {
  Resource,
  DAY_OF_WEEK_NAME,
  getTimeStringFromMinutes,
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

const StyledTimeRangesContainer = styled(StyledContainer)`
  gap: 16px;
`;

const StyledEmptyTimesLabel = styled.p`
  font-style: italic;
  font-weight: 500;
  text-align: center;
  margin: 24px 16px;
  line-height: 24px;
`;

type ResourceTimePickerProps = {
  selectedDate: Date;
  selectedTime: { startMinutes: number; endMinutes: number } | null;
  setSelectedTime: (time: { startMinutes: number; endMinutes: number }) => void;
  resource: Resource<string>;
};

/**
 * Displays the calendar picker and time pickers at reservation form date/time select step.
 */
export default function ResourceTimePicker({
  selectedDate,
  selectedTime,
  setSelectedTime,
  resource,
}: ResourceTimePickerProps) {
  // Used for rendering time range's from/to options
  const availableTimes = getTimesList(
    resource.reservationTimeGranularityMinutes
  ).map(({ minutesPastMidnight }) => ({
    label: getTimeStringFromMinutes(minutesPastMidnight, "hh:mm aaa"),
    value: minutesPastMidnight,
  }));
  const selectedDayOfWeekName = DAY_OF_WEEK_NAME[selectedDate.getDay()];
  // TODO: available slots should come from the server, after checking for overlapping bookings
  const availableSlots = resource.availability[selectedDayOfWeekName].rules.map(
    (rule, index) => ({
      label: `${customFormatTime(rule.startInMinutesPastMidnight)} - ${customFormatTime(rule.endInMinutesPastMidnight)}`,
      value: index,
      // Added to make it trackable
      startMinutes: rule.startInMinutesPastMidnight,
      endMinutes: rule.endInMinutesPastMidnight,
    })
  );
  // Index of selected slot, from the availableSlots variable
  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState<
    number | null
  >(
    selectedTime && resource.reservationTimeType === "slots"
      ? availableSlots.findIndex(
          (slot) => selectedTime.startMinutes === slot.startMinutes
        )
      : null
  );
  const [selectedTimeStartMinutes, setSelectedTimeStartMinutes] = useState<
    number | null
  >(
    selectedTime && resource.reservationTimeType === "ranges"
      ? selectedTime.startMinutes
      : null
  );
  const [selectedTimeEndMinutes, setSelectedTimeEndMinutes] = useState<
    number | null
  >(
    selectedTime && resource.reservationTimeType === "ranges"
      ? selectedTime.endMinutes
      : null
  );

  // Calls the setSelectedTime prop function every time the selected time range slot index or time start/end change
  useEffect(() => {
    const startMinutes =
      resource.reservationTimeType === "slots" && selectedTimeSlotIndex !== null
        ? availableSlots[selectedTimeSlotIndex].startMinutes
        : selectedTimeStartMinutes;
    const endMinutes =
      resource.reservationTimeType === "slots" && selectedTimeSlotIndex !== null
        ? availableSlots[selectedTimeSlotIndex].endMinutes
        : selectedTimeEndMinutes;
    if (startMinutes !== null && endMinutes !== null) {
      setSelectedTime({ startMinutes, endMinutes });
    }
  }, [selectedTimeSlotIndex, selectedTimeStartMinutes, selectedTimeEndMinutes]);

  // Renders the time range form
  const renderTimesRanges = () =>
    resource.availability[selectedDayOfWeekName].available ? (
      <StyledTimeRangesContainer>
        <FormField
          label="From"
          type="options-select"
          options={availableTimes}
          value={selectedTimeStartMinutes}
          onChange={setSelectedTimeStartMinutes}
        />
        <FormField
          label="From"
          type="options-select"
          options={availableTimes}
          value={selectedTimeEndMinutes}
          onChange={setSelectedTimeEndMinutes}
        />
      </StyledTimeRangesContainer>
    ) : (
      <StyledEmptyTimesLabel>
        There are no available time slots for the selected day.
      </StyledEmptyTimesLabel>
    );

  // Renders the list of possible time slots to pick
  const renderTimeSlots = () =>
    availableSlots.length ? (
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
        There are no available time ranges for the selected day.
      </StyledEmptyTimesLabel>
    );

  return (
    <StyledContainer>
      {resource.reservationTimeType === "ranges"
        ? renderTimesRanges()
        : renderTimeSlots()}
    </StyledContainer>
  );
}
