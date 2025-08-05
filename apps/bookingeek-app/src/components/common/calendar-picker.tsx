import { useEffect } from "react";
import Calendar from "./calendar";
import styled from "styled-components";
import { MONTHS } from "../../data/months";
import IconButton from "./icon-button";

const StyledPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 320px;
`;

const StyledPickerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  width: 100%;
`;

type CalendarPickerProps = {
  // Selected date
  value: Date | null;
  // Change handler
  onChange: (value: Date) => void;
  // Zero-indexed number of month to display
  displayMonth: number;
  // Number of year to display
  displayYear: number;
  // Callback to handle navigation to next month
  onNextClick: () => void;
  // Callback to handle navigation to previous month
  onPrevClick: () => void;
  // If defined, provides an alternative for availableDates
  availableDaysOfSelectedMonth?: Array<boolean>;
  // Called every time the displayed month changes
  onDisplayMonthOrYearChange?: (month: number, year: number) => void;
  // Used to prevent past dates to be outlined and clickable
  disablePastDates?: boolean;
};

/**
 * Allows to pick a date.
 */
export default function CalendarPicker({
  value,
  availableDaysOfSelectedMonth,
  displayMonth,
  displayYear,
  disablePastDates,
  onChange,
  onDisplayMonthOrYearChange,
  onNextClick,
  onPrevClick,
}: CalendarPickerProps) {
  // Whether active day should be highlighted in the calendar
  const valueIsInView =
    value?.getMonth() === displayMonth && value?.getFullYear() === displayYear;

  // Handles a change in the selected date and calls the onChange handler
  const handleChange = (day: number) => {
    const newDate = new Date(displayYear, displayMonth, day, 0, 0, 0, 0);
    onChange(newDate);
  };

  useEffect(() => {
    if (onDisplayMonthOrYearChange) {
      onDisplayMonthOrYearChange(displayMonth, displayYear);
    }
  }, [displayMonth, displayYear]);

  return (
    <StyledPickerContainer>
      <StyledPickerHeader>
        <IconButton onClick={onPrevClick}>
          <>{"<"}</>
        </IconButton>
        <span>{`${MONTHS[displayMonth]} ${displayYear}`}</span>
        <IconButton onClick={onNextClick}>{">"}</IconButton>
      </StyledPickerHeader>
      {/* TODO: take resource.minimalReservationAdvance into consideration as well */}
      <Calendar
        activeDay={valueIsInView ? value.getDate() : undefined}
        outlinedDays={availableDaysOfSelectedMonth?.map((value, dayIndex) =>
          disablePastDates
            ? new Date().getTime() <
                new Date(
                  `${displayYear}-${displayMonth + 1}-${dayIndex}`
                ).getTime() && value
            : value
        )}
        year={displayYear}
        monthIndex={displayMonth}
        onClick={handleChange}
      />
    </StyledPickerContainer>
  );
}
