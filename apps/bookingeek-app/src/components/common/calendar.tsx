import styled from "styled-components";
import { getCalendarWeeks } from "../../helpers/get-calendar-weeks";
import { useMemo } from "react";

type DayProps = {
  header?: boolean;
  backgrounded?: boolean;
  outlined?: boolean;
  clickable?: boolean;
};

const StyledDay = styled.div<DayProps>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 32px;
  color: ${(props) => (props.backgrounded ? "#FFFFFF" : "inherit")};
  font-weight: ${(props) => (props.header ? 400 : 700)};
  cursor: ${(props) => (props.clickable ? "pointer" : "normal")};
  background: ${(props) => (props.backgrounded ? "#000000" : "none")};
  border: ${(props) => (props.outlined ? "1px solid #222222" : "none")};
  &:hover {
    background: ${(props) =>
      props.backgrounded ? "#000000" : props.clickable ? "#e8e8e8" : "none"};
  }
`;

const StyledWeek = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledMonth = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const header = ["S", "M", "T", "W", "T", "F", "S"];

type CalendarProps = {
  // Day of month that should be backgrounded
  activeDay?: number;
  // Days of month that should be outlined
  outlinedDays?: Array<boolean>;
  // Called once clicking on a clickable day
  onClick?: (day: number) => void;
  // Month to display
  monthIndex: number;
  // Year to display
  year: number;
  // If false, only outlined days will be clickable
  allClickable?: boolean;
};

/**
 * Renders a calendar. Used as base for CalendarPicker component.
 */
export default function Calendar({
  activeDay,
  outlinedDays,
  monthIndex,
  year,
  allClickable,
  onClick,
}: CalendarProps) {
  const weeks = useMemo(
    () => getCalendarWeeks(monthIndex, year),
    [monthIndex, year]
  );

  const handleClick = (day: number) => {
    if (onClick) {
      const dayIsClickable = outlinedDays && outlinedDays[day];
      if (allClickable || dayIsClickable) {
        onClick(day);
      }
    }
  };

  return (
    <StyledMonth>
      <StyledWeek>
        {header.map((day) => (
          <StyledDay header>{day}</StyledDay>
        ))}
      </StyledWeek>
      {weeks.map((week) => (
        <StyledWeek>
          {week.map((day) => (
            <StyledDay
              onClick={() => handleClick(day)}
              backgrounded={day === activeDay}
              outlined={outlinedDays && outlinedDays[day]}
              clickable={allClickable || (outlinedDays && outlinedDays[day])}
            >
              {day > 0 ? day : ""}
            </StyledDay>
          ))}
        </StyledWeek>
      ))}
    </StyledMonth>
  );
}
