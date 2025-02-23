import { useState } from "react";
import Calendar from "../calendar/calendar";
import styled from "styled-components";
import { MONTHS } from "../../data/months";
import IconButton from "../icon-button/icon-button";

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
  // If defined, these dates will be outlined and only them can be selected
  availableDates?: Array<Date>;
};

/**
 * Allows to pick a date.
 */
export default function CalendarPicker({
  value,
  availableDates,
  onChange,
}: CalendarPickerProps) {
  const [displayMonth, setDisplayMonth] = useState(
    value?.getMonth() || new Date().getMonth()
  );
  const [displayYear, setDisplayYear] = useState(
    value?.getFullYear() || new Date().getFullYear()
  );

  // Whether active day should be highlighted in the calendar
  const valueIsInView =
    value?.getMonth() === displayMonth && value?.getFullYear() === displayYear;

  // Handles a change in the selected date and calls the onChange handler
  const handleChange = (day: number) => {
    const newDate = new Date(displayYear, displayMonth, day, 0, 0, 0, 0);
    onChange(newDate);
  };

  // Go to previous month
  const onPrevClick = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  // Go to next month
  const onNextClick = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  // Parsed available dates that are in the current view and should be rendered as outlined days
  const outlinedDays = availableDates
    ?.filter(
      (availableDate) =>
        availableDate.getMonth() === displayMonth &&
        availableDate.getFullYear() === displayYear
    )
    // ...and retrieve only their month days
    .map((availableDate) => availableDate.getDate());

  return (
    <StyledPickerContainer>
      <StyledPickerHeader>
        <IconButton onClick={onPrevClick}>
          <>{"<"}</>
        </IconButton>
        <span>{`${MONTHS[displayMonth]} ${displayYear}`}</span>
        <IconButton onClick={onNextClick}>{">"}</IconButton>
      </StyledPickerHeader>
      <Calendar
        activeDay={valueIsInView ? value.getDate() : undefined}
        outlinedDays={outlinedDays}
        year={displayYear}
        monthIndex={displayMonth}
        onClick={handleChange}
        allClickable={!availableDates}
      />
    </StyledPickerContainer>
  );
}
