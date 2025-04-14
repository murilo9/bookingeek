import { endOfMonth, getWeeksInMonth } from "date-fns";

/**
 * Returns an aray of weeks in a given month.
 * @param monthIndex Reference month, zero-indexed.
 * @param year Reference year.
 * @returns
 */
export function getCalendarWeeks(monthIndex: number, year: number) {
  const startOfMonthDate = new Date(year, monthIndex, 1, 0, 0, 0, 0);
  const weeksInMonth = getWeeksInMonth(startOfMonthDate);
  const lastDayOfMonth = endOfMonth(startOfMonthDate).getDate();
  const weeks = [];
  let lastFilledDay = 0;
  // Fill each week
  for (let weekIndex = 0; weekIndex < weeksInMonth; weekIndex++) {
    const week = [0, 0, 0, 0, 0, 0, 0];
    if (lastFilledDay === 0) {
      const firstDayOfMonthDayOfWeek = startOfMonthDate.getDay();
      let dayOfWeekToFill = firstDayOfMonthDayOfWeek;
      week[firstDayOfMonthDayOfWeek] = lastFilledDay = 1;
      // Fill each day of week
      while (dayOfWeekToFill < week.length) {
        week[dayOfWeekToFill] = lastFilledDay;
        dayOfWeekToFill++;
        lastFilledDay++;
      }
    } else {
      // Fill each day of week
      for (
        let dayOfWeekIndex = 0;
        dayOfWeekIndex < week.length;
        dayOfWeekIndex++
      ) {
        if (lastFilledDay === lastDayOfMonth) {
          break;
        }
        week[dayOfWeekIndex] = lastFilledDay;
        lastFilledDay++;
      }
    }
    weeks.push(week);
  }
  return weeks;
}
