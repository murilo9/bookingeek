import { Expose } from 'class-transformer';
import { IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateResourceDto {
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  slug: string;
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsIn(['date-time', 'date-only'])
  availabilityType: 'date-time' | 'date-only';
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsIn(['in-loco-online', 'online-only', 'in-loco-only'])
  checkoutType: 'in-loco-online' | 'online-only' | 'in-loco-only';
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsIn(['ranges', 'slots'])
  reservationTimeType: 'ranges' | 'slots';
}
