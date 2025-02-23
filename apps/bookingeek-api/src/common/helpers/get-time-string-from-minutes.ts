import { addMinutes, format } from 'date-fns';
import { TimeString } from '../types';

export const getTimeStringFromMinutes = (
  minutesPastMidnight: number,
  customFormat?: string,
): TimeString => {
  let date = new Date(0, 0, 0, 0, 0, 0, 0);
  date = addMinutes(date, minutesPastMidnight);
  return format(date, customFormat || 'hh:mm:ss');
};
