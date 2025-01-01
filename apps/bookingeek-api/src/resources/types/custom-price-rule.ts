import { TimeRange } from '../../common/types/time-range';

/**
 * A resource's (un)availability rule for a custom day (and possibly, times) in the year.
 */
export type CustomPriceRule = {
  // Rule month
  month: number;
  // Rule day
  day: number;
  // Rule times. Only applies if resource's availabilityType = 'date-time'
  times: Array<TimeRange>;
};
