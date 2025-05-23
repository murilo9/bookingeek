import styled from "styled-components";
import { useEffect, useState } from "react";

import { COLORS } from "../../data/colors";
import { getTimesList } from "../../helpers/get-times-list";
import { TimeRange, ReservationTimeGranularity } from "@bookingeek/core";
import { getUtcTimeString } from "../../helpers/getUtcTimeString";
import IconButton from "../common/icon-button";
import Select from "../common/select";
import DeleteIcon from "../icons/delete/delete";

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
  onChange: (value: TimeRange) => void;
  customDeleteIcon?: JSX.Element;
  error?: boolean;
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
 * A form for a single time range/slot availability rule
 */
export default function AvailabilityTimeRuleForm({
  timeRange,
  reservationTimeGranularityMinutes,
  reservationTimeType,
  onRemoveClick,
  onChange,
  customDeleteIcon,
  error,
}: AvailabilityDayOfWeekFormProps) {
  const [startTime, setStartTime] = useState(
    timeRange.startTimeInMinutesPastMidnight
  );
  const [endTime, setEndTime] = useState(
    timeRange.endTimeInMinutesPastMidnight
  );
  const possibleTimes = getTimesList(reservationTimeGranularityMinutes);
  const possibleSlots = getSlotsList(reservationTimeGranularityMinutes);
  const ruleIsInvalid = startTime >= endTime;

  // Emmits the onChange events every time startTime or endTime change
  useEffect(() => {
    const startTimeChanged =
      startTime !== timeRange.startTimeInMinutesPastMidnight;
    const endTimeChanged = endTime !== timeRange.endTimeInMinutesPastMidnight;
    if (startTimeChanged || endTimeChanged) {
      onChange({
        startTimeInMinutesPastMidnight: startTime,
        endTimeInMinutesPastMidnight: endTime,
      });
    }
  }, [startTime, endTime]);

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
          error={ruleIsInvalid || error}
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
          error={ruleIsInvalid || error}
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
        error={ruleIsInvalid || error}
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
          {customDeleteIcon || <DeleteIcon color={COLORS.danger} size={20} />}
        </IconButton>
      </StyledGrid>
      {ruleIsInvalid ? (
        <StyledErrorMessage>Invalid range</StyledErrorMessage>
      ) : null}
    </StyledForm>
  );
}
