import { DateDef } from 'src/reservations/types/date-def';
import { getTimeStringFromMinutes } from './get-time-string-from-minutes';

export const getDateFromDateDef = (
  dateDef: DateDef,
  timeInMinutesPastMidnight?: number,
): Date => {
  const timeString =
    timeInMinutesPastMidnight !== undefined
      ? getTimeStringFromMinutes(timeInMinutesPastMidnight)
      : null;
  return new Date(
    `${dateDef.year}-${dateDef.month + 1}-${dateDef.day} ${timeString || '00:00:00'}`,
  );
};
