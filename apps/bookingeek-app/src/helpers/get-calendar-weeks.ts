import { endOfMonth, getWeeksInMonth, startOfMonth } from "date-fns";

export function getCalendarWeeks(monthIndex: number, year: number) {
  const referenceDate = new Date(year, monthIndex, 1, 0, 0, 0, 0);
  const weeksInMonth = getWeeksInMonth(referenceDate);
  const lastDayOfMonth = endOfMonth(referenceDate).getDate();
  const weeks = [];
  let lastFilledDay = 0;
  for (let weekIndex = 0; weekIndex < weeksInMonth; weekIndex++) {
    const week = [0, 0, 0, 0, 0, 0, 0];
    if (lastFilledDay === 0) {
      const startOfMonthDate = startOfMonth(referenceDate);
      const firstDayOfMonthDayOfWeek = startOfMonthDate.getDay();
      let dayOfWeekToFill = firstDayOfMonthDayOfWeek;
      week[firstDayOfMonthDayOfWeek] = lastFilledDay = 1;
      while (dayOfWeekToFill < week.length) {
        week[dayOfWeekToFill] = lastFilledDay;
        dayOfWeekToFill++;
        lastFilledDay++;
      }
    } else {
      for (
        let dayOfWeekIndex = 0;
        dayOfWeekIndex < week.length;
        dayOfWeekIndex++
      ) {
        if (lastFilledDay === lastDayOfMonth) {
          break;
        }
        week[dayOfWeekIndex] = lastFilledDay + 1;
        lastFilledDay++;
      }
    }
    weeks.push(week);
  }
  return weeks;
}
