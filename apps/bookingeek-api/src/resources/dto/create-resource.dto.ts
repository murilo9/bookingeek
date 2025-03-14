import { Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ResourcePictureDto } from './resource-picture.dto';
import { ReservationTimeGranularity } from '@bookingeek/core';

export class CreateResourceDto {
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;
  @Expose()
  @IsDefined()
  @IsString()
  subtitle: string;
  @Expose()
  @IsDefined()
  @IsString()
  description: string;
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  slug: string;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => ResourcePictureDto)
  picture: ResourcePictureDto;
  @Expose()
  @IsDefined()
  @IsNumber()
  @ValidateIf((dto) => dto.priceInCents !== null)
  priceInCents: number | null;
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsIn([5, 10, 15, 30, 60])
  priceTypeMinutes: ReservationTimeGranularity;
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['date-time', 'date-only'])
  availabilityType: 'date-time' | 'date-only';
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['in-loco-online', 'online-only', 'in-loco-only'])
  checkoutType: 'in-loco-online' | 'online-only' | 'in-loco-only';
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['ranges', 'slots'])
  reservationTimeType: 'ranges' | 'slots';
}
