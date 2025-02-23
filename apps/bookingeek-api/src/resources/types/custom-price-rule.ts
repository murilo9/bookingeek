import { Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsIn,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { TimeRangeDto } from '../../common/dto/time-range.dto';

/**
 * A resource's (un)availability rule for a custom day (and possibly, times) in the year.
 */
export class CustomPriceRule {
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsIn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  // Rule month
  month: number;
  @Expose()
  @IsDefined()
  @IsNumber()
  // Rule day
  day: number;
  @Expose()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeRangeDto)
  // Rule times. Only applies if resource's availabilityType = 'date-time'
  times: Array<TimeRangeDto>;
  @Expose()
  @IsDefined()
  @IsNumber()
  priceInCents: number;
}
