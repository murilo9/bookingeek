import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDefined, ValidateNested } from "class-validator";
import { TimeRange } from "../common";

/**
 * Resource's availability rules for a day of the week.
 */
export class DayOfWeekAvailability {
  @Expose()
  @IsDefined()
  @IsBoolean()
  // Whether this day of week is available
  available: boolean;
  @Expose()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeRange)
  // Available time ranges (works for both time ranges and time slots)
  rules: Array<TimeRange>;
}
