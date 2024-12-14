import { TimeRange } from 'src/common/types/time-range';

/**
 * Resource's availability rules for a day of the week.
 */
export type DayOfWeekAvailability = {
  // Whether this day of week is available
  available: boolean;
  // Available time ranges. Only applies if timeType = 'ranges'
  rules: Array<TimeRange>;
};
