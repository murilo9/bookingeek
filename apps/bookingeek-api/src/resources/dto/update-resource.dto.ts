import { Expose, Type } from 'class-transformer';
import {
  DayOfWeekAvailability,
  ResourcePicture,
  ResourceExtraField,
  CustomPriceRule,
} from '../types';
import { ResorucePriceType } from '../types';
import {
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class ResourceWeekAvailabilityDto {
  '0': DayOfWeekAvailability; // Sunday
  '1': DayOfWeekAvailability; // Monday
  '2': DayOfWeekAvailability; // Tuesday
  '3': DayOfWeekAvailability; // Wednesday
  '4': DayOfWeekAvailability; // Thursday
  '5': DayOfWeekAvailability; // Friday
  '6': DayOfWeekAvailability; // Saturday
}

class MinimalReservationDuration {
  amount: number;
  unit: 'hours' | 'minutes';
}

class MinimalReservationAdvance {
  amount: number;
  unit: 'weeks' | 'days' | 'hours' | 'minutes';
}

export class UpdateResourceDto {
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
  @Type(() => ResourcePicture)
  picture: ResourcePicture;
  @Expose()
  @IsDefined()
  @IsNumber()
  @ValidateIf((dto) => dto.priceInCents !== null)
  priceInCents: number | null;
  @Expose()
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  @IsIn(['hourly', '30-min', '15-min', '10-min', '5-min'])
  priceType: ResorucePriceType;
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['in-loco-online', 'online-only', 'in-loco-only'])
  checkoutType: 'in-loco-online' | 'online-only' | 'in-loco-only';
  @Expose()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceExtraField)
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
  @IsString()
  @IsIn(['5-min', '10-min', '15-min', '30-min', 'hour'])
  reservationTimeGranularity: '5-min' | '10-min' | '15-min' | '30-min' | 'hour';
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => MinimalReservationDuration)
  minimalReservationDuration: MinimalReservationDuration;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => MinimalReservationAdvance)
  minimalReservationAdvance: MinimalReservationAdvance;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => ResourceWeekAvailabilityDto)
  availability: ResourceWeekAvailabilityDto;
  @Expose()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomPriceRule)
  unavailability: Array<CustomPriceRule>;
  @Expose()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomPriceRule)
  customPrices: Array<CustomPriceRule>;
}
