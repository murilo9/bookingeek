import { Expose } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class MinimalReservationAdvanceDto {
  @Expose()
  @IsDefined()
  @IsNumber()
  amount: number;
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsIn(['weeks', 'days', 'hours', 'minutes'])
  unit: 'weeks' | 'days' | 'hours' | 'minutes';
}
