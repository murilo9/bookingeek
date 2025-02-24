import { Expose, Type } from "class-transformer";
import {} from "../businesses";
import {
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { DayOfWeekName } from "../common";
import { CustomPriceRule } from "./custom-price-rule";
import { DayOfWeekAvailability } from "./day-of-week-availability";
import { MinimalReservationAdvance } from "./minimal-reservation-advance";
import { MinimalReservationDuration } from "./minimal-reservation-duration";
import { ReservationTimeGranularity } from "./reservartion-time-granularity";
import { ResourceCheckoutType } from "./resource-checkout-type";
import { ResourceExtraField } from "./resource-extra-field";
import { ResourcePicture } from "./resource-picture";

export class ResourceWeekAvailability {
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailability)
  sunday: DayOfWeekAvailability;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailability)
  monday: DayOfWeekAvailability;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailability)
  tuesday: DayOfWeekAvailability;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailability)
  wednesday: DayOfWeekAvailability;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailability)
  thursday: DayOfWeekAvailability;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailability)
  friday: DayOfWeekAvailability;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DayOfWeekAvailability)
  saturday: DayOfWeekAvailability;
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
  @IsNumber()
  @IsIn([5, 10, 15, 30, 60])
  priceTypeMinutes: ReservationTimeGranularity;
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(["in-loco-online", "online-only", "in-loco-only"])
  checkoutType: ResourceCheckoutType;
  @Expose()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceExtraField)
  extraFields: Array<ResourceExtraField>;
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(["date-time", "date-only"])
  availabilityType: "date-time" | "date-only";
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(["ranges", "slots"])
  reservationTimeType: "ranges" | "slots";
  @Expose()
  @IsDefined()
  @IsNumber()
  @IsIn([5, 10, 15, 30, 60])
  reservationTimeGranularityMinutes: ReservationTimeGranularity;
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
  @Type(() => ResourceWeekAvailability)
  availability: Record<DayOfWeekName, DayOfWeekAvailability>;
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
