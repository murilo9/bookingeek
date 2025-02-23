import { DateDef } from 'src/reservations/types/date-def';

export const areDateDefsEqual = (date1: DateDef, date2: DateDef): boolean =>
  date1.day === date2.day &&
  date1.month === date2.month &&
  date1.year === date2.year;
