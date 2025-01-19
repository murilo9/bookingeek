import { TimeRange } from "@bookingeek/api/src/common/types";
import styled from "styled-components";
import { useState } from "react";
import IconButton from "../../../common/components/icon-button/icon-button";
import Select from "../../../common/components/select/select";
import { getUtcTimeString } from "../../../common/helpers/getUtcTimeString";
import DeleteIcon from "../../../common/icons/delete/delete";
import { ReservationTimeGranularity } from "@bookingeek/api/src/resources/types";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 16px;
`;

const StyledGrid = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledErrorMessage = styled.p`
  font-size: 14px;
  color: #ff0000;
  padding-left: 4px;
`;

type AvailabilityDayOfWeekFormProps = {
  timeRange: TimeRange;
  reservationTimeGranularityMinutes: ReservationTimeGranularity;
  reservationTimeType: "ranges" | "slots";
  onRemoveClick: () => void;
};

// Retrives a list of times based on the time granularity
const getTimeList = (
  reservationTimeGranularity: ReservationTimeGranularity
) => {
  const times: Array<{ minutesPastMidnight: number }> = [];
  let currentMinutes = 0;
  do {
    times.push({
      minutesPastMidnight: currentMinutes,
    });
    currentMinutes += reservationTimeGranularity;
  } while (currentMinutes < 60 * 24);
  return times;
};

const getSlotsList = (
  reservationTimeGranularity: ReservationTimeGranularity
) => {
  const slots: Array<{ startTime: number; endTime: number }> = [];
  let currentMinutes = 0;
  do {
    slots.push({
      startTime: currentMinutes,
      endTime: currentMinutes + reservationTimeGranularity,
    });
    currentMinutes += reservationTimeGranularity;
  } while (currentMinutes < 60 * 24);
  return slots;
};

/**
 * A form for a single time range availability rule
 */
export default function AvailabilityRangeRuleForm({
  timeRange,
  reservationTimeGranularityMinutes,
  reservationTimeType,
  onRemoveClick,
}: AvailabilityDayOfWeekFormProps) {
  const [startTime, setStartTime] = useState(
    timeRange.startInMinutesPastMidnight
  );
  const [endTime, setEndTime] = useState(timeRange.endInMinutesPastMidnight);
  const possibleTimes = getTimeList(reservationTimeGranularityMinutes);
  const possibleSlots = getSlotsList(reservationTimeGranularityMinutes);
  const ruleIsInvalid = startTime >= endTime;

  // Updates both startTime and endTime for a time slot change
  const handleTimeSlotChange = (newStartTime: number) => {
    setStartTime(newStartTime);
    setEndTime(newStartTime + reservationTimeGranularityMinutes);
  };

  // Renders two selects for defining a time range, or a single select for picking a time slot
  const renderInputField = () =>
    reservationTimeType === "ranges" ? (
      <>
        <Select
          value={startTime}
          onChange={({ target: { value } }) => setStartTime(Number(value))}
          error={ruleIsInvalid}
        >
          {possibleTimes.map((time) => (
            <option
              value={time.minutesPastMidnight}
              key={time.minutesPastMidnight}
            >
              {getUtcTimeString(new Date(time.minutesPastMidnight * 60 * 1000))}
            </option>
          ))}
        </Select>
        <p>to</p>
        <Select
          value={endTime}
          onChange={({ target: { value } }) => setEndTime(Number(value))}
          error={ruleIsInvalid}
        >
          {possibleTimes.map((time) => (
            <option
              value={time.minutesPastMidnight}
              key={time.minutesPastMidnight}
            >
              {getUtcTimeString(new Date(time.minutesPastMidnight * 60 * 1000))}
            </option>
          ))}
        </Select>
      </>
    ) : (
      <Select
        value={startTime}
        onChange={({ target: { value } }) =>
          handleTimeSlotChange(Number(value))
        }
        error={ruleIsInvalid}
      >
        {possibleSlots.map((slot) => (
          <option value={slot.startTime} key={startTime}>
            {`${getUtcTimeString(new Date(slot.startTime * 60 * 1000))} - ${getUtcTimeString(new Date(slot.endTime * 60 * 1000))}`}
          </option>
        ))}
      </Select>
    );

  return (
    <StyledForm>
      <StyledGrid>
        {renderInputField()}
        <IconButton onClick={onRemoveClick}>
          <DeleteIcon color="#ff0000" size={20} />
        </IconButton>
      </StyledGrid>
      {ruleIsInvalid ? (
        <StyledErrorMessage>Invalid range</StyledErrorMessage>
      ) : null}
    </StyledForm>
  );
}
