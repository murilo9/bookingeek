import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { DayOfWeekAvailabilityDto } from './day-of-week-availability.dto';
import { ResourcePictureDto } from './resource-picture.dto';
import {
  DayOfWeekName,
  MinimalReservationAdvance,
  MinimalReservationDuration,
  ReservationTimeGranularity,
  ResourceCheckoutType,
  ResourceExtraField,
} from '@bookingeek/core';
import { CustomPriceRuleDto } from './custom-price-rule';
import { MinimalReservationAdvanceDto } from './minimal-reservation-advance.dto';
import { ResourceExtraFieldDto } from './resource-extra-field.dto';

export class ResourceWeekAvailabilityDto {
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailabilityDto)
  sunday: DayOfWeekAvailabilityDto;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailabilityDto)
  monday: DayOfWeekAvailabilityDto;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailabilityDto)
  tuesday: DayOfWeekAvailabilityDto;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailabilityDto)
  wednesday: DayOfWeekAvailabilityDto;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailabilityDto)
  thursday: DayOfWeekAvailabilityDto;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailabilityDto)
  friday: DayOfWeekAvailabilityDto;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailabilityDto)
  saturday: DayOfWeekAvailabilityDto;
}

export class UpdateResourceDto {
  @Expose()
  @IsDefined()
  @IsBoolean()
  isActive: boolean;
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
  subtitle: string;
  @Expose()
  @IsDefined()
  @IsString()
  description: string;
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
  @IsIn(['in-loco-online', 'online-only', 'in-loco-only'])
  checkoutType: ResourceCheckoutType;
  @Expose()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceExtraFieldDto)
  extraFields: Array<ResourceExtraField>;
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['date-time', 'date-only'])
  availabilityType: 'date-time' | 'date-only';
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['ranges', 'slots'])
  reservationTimeType: 'ranges' | 'slots';
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsIn([5, 10, 15, 30, 60])
  reservationTimeGranularityMinutes: ReservationTimeGranularity;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => MinimalReservationAdvanceDto)
  minimalReservationDuration: MinimalReservationDuration;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => MinimalReservationAdvanceDto)
  minimalReservationAdvance: MinimalReservationAdvance;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => ResourceWeekAvailabilityDto)
  availability: Record<DayOfWeekName, DayOfWeekAvailabilityDto>;
  @Expose()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomPriceRuleDto)
  unavailability: Array<CustomPriceRuleDto>;
  @Expose()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomPriceRuleDto)
  customPrices: Array<CustomPriceRuleDto>;
}
