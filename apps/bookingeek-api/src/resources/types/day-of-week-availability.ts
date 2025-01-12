import { TimeRange } from '../../common/types';

/**
 * Resource's availability rules for a day of the week.
 */
export class DayOfWeekAvailability {
  // Whether this day of week is available
  available: boolean;
  // Available time ranges (works for both time ranges and time slots)
  rules: Array<TimeRange>;
}
