import { Expose } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class MinimalReservationDuration {
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  amount: number;
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['hours', 'minutes'])
  unit: 'hours' | 'minutes';
}
