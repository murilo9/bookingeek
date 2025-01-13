import { Expose } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

/**
 * A time range within a day
 */
export class TimeRangeDto {
  @Expose()
  @IsDefined()
  @IsNumber()
  // Start time, in minutes, past midnight
  startInMinutesPastMidnight: number;
  @Expose()
  @IsDefined()
  @IsNumber()
  // End time, in minutes, past midnight
  endInMinutesPastMidnight: number;
}
