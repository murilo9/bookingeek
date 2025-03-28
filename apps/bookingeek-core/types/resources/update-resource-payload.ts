import {} from "../businesses";
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
  sunday: DayOfWeekAvailability;
  monday: DayOfWeekAvailability;
  tuesday: DayOfWeekAvailability;
  wednesday: DayOfWeekAvailability;
  thursday: DayOfWeekAvailability;
  friday: DayOfWeekAvailability;
  saturday: DayOfWeekAvailability;
}

export class UpdateResourcePayload {
  isActive: boolean;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  picture: ResourcePicture;
  priceInCents: number | null;
  priceTypeMinutes: ReservationTimeGranularity;
  checkoutType: ResourceCheckoutType;
  extraFields: Array<ResourceExtraField>;
  availabilityType: "date-time" | "date-only";
  reservationTimeType: "ranges" | "slots";
  reservationTimeGranularityMinutes: ReservationTimeGranularity;
  minimalReservationDuration: MinimalReservationDuration;
  minimalReservationAdvance: MinimalReservationAdvance;
  availability: Record<DayOfWeekName, DayOfWeekAvailability>;
  unavailability: Array<CustomPriceRule>;
  customPrices: Array<CustomPriceRule>;
}
