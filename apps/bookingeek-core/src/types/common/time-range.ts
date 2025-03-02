import { Expose } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

/**
 * A time range within a day
 */
export class TimeRange {
  // Start time, in minutes, past midnight
  startInMinutesPastMidnight: number;
  // End time, in minutes, past midnight
  endInMinutesPastMidnight: number;
}
