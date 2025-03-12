import { TimeRange } from "../common";

/**
 * A resource's (un)availability rule for a custom day (and possibly, times) in the year.
 */
export class CustomPriceRule {
  // Rule month
  month: number;
  // Rule day
  day: number;
  // Rule times. Only applies if resource's availabilityType = 'date-time'
  times: Array<TimeRange>;
  // Rule price, in cents
  priceInCents: number;
}
