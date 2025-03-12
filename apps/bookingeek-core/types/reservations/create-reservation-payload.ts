import { DateDef } from "./date-def";
import { ReservationCustomerData } from "./reservation-customer-data";

export class CreateReservationPayload {
  // Reservation's resource ID
  resourceId: string;
  // Reservation start date data
  startDate: DateDef;
  // Reservation end date data
  endDate: DateDef;
  // Start time, in minutes past midnight. Only applies if type = 'date-time'
  startTimeInMinutesPastMidnight: number | null;
  // End time, in minutes past midnight. Only applies if type = 'date-time'
  endTimeInMinutesPastMidnight: number | null;
  // Customer's data
  customerData: ReservationCustomerData;
  // Extra data fields, if any
  extraFields: Record<string, string | boolean>;
  // Checkout option chosen by the customer
  checkoutOptionChosen: "online" | "in-loco";
}
