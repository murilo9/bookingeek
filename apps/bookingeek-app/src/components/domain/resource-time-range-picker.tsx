import styled from "styled-components";
import FormField from "../common/form-field";
import { useState, useEffect } from "react";
import { getTimeStringFromMinutes, Resource } from "@bookingeek/core";
import { getTimesList } from "../../helpers/get-times-list";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const StyledTimeRangesContainer = styled(StyledContainer)`
  gap: 16px;
`;

type ResourceTimeRangePickerProps = {
  selectedTime: { startMinutes: number; endMinutes: number } | null;
  setSelectedTime: (time: { startMinutes: number; endMinutes: number }) => void;
  resource: Resource<string>;
};

export default function ResourceTimeRangePicker({
  selectedTime,
  setSelectedTime,
  resource,
}: ResourceTimeRangePickerProps) {
  // Used for rendering time range's from/to options
  const availableTimes = getTimesList(
    resource.reservationTimeGranularityMinutes
  ).map(({ minutesPastMidnight }) => ({
    label: getTimeStringFromMinutes(minutesPastMidnight, "hh:mm aaa"),
    value: minutesPastMidnight,
  }));
  const [selectedTimeStartMinutes, setSelectedTimeStartMinutes] = useState<
    number | null
  >(selectedTime ? selectedTime.startMinutes : null);
  const [selectedTimeEndMinutes, setSelectedTimeEndMinutes] = useState<
    number | null
  >(selectedTime ? selectedTime.endMinutes : null);

  // Calls the setSelectedTime prop function every time the selected time range slot index or time start/end change
  useEffect(() => {
    if (selectedTimeStartMinutes !== null && selectedTimeEndMinutes !== null) {
      setSelectedTime({
        startMinutes: selectedTimeStartMinutes,
        endMinutes: selectedTimeEndMinutes,
      });
    }
  }, [selectedTimeStartMinutes, selectedTimeEndMinutes]);

  return (
    <StyledContainer>
      <StyledTimeRangesContainer>
        <FormField
          label="From"
          placeholder="Start time"
          type="options-select"
          options={availableTimes}
          value={selectedTimeStartMinutes}
          onChange={(timeString) =>
            setSelectedTimeStartMinutes(Number(timeString))
          }
        />
        <FormField
          label="To"
          placeholder="End time"
          type="options-select"
          options={availableTimes}
          value={selectedTimeEndMinutes}
          onChange={(timeString) =>
            setSelectedTimeEndMinutes(Number(timeString))
          }
        />
      </StyledTimeRangesContainer>
    </StyledContainer>
  );
}
