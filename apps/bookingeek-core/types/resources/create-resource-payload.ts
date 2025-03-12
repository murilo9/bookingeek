export class CreateResourcePayload {
  title: string;
  slug: string;
  availabilityType: "date-time" | "date-only";
  checkoutType: "in-loco-online" | "online-only" | "in-loco-only";
  reservationTimeType: "ranges" | "slots";
}
