import { ReservationTimeGranularity } from "./reservartion-time-granularity";
import { ResourcePicture } from "./resource-picture";

export class CreateResourcePayload {
  title: string;
  description: string;
  subtitle: string;
  slug: string;
  picture: ResourcePicture;
  priceInCents: number | null;
  priceTypeMinutes: ReservationTimeGranularity;
  availabilityType: "date-time" | "date-only";
  checkoutType: "in-loco-online" | "online-only" | "in-loco-only";
  reservationTimeType: "ranges" | "slots";
}
