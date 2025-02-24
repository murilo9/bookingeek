import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class DateDef {
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  year: number;
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  month: number;
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  day: number;
}
