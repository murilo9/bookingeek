/**
 * A time range within a day
 */
export type TimeRange = {
  // Start time, in minutes, past midnight
  startInMinutesPastMidnight: number;

  // End time, in minutes, past midnight
  endInMinutesPastMidnight: number;
};
