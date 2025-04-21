import { TimeRange } from "../common";
import { Reservation } from "../reservations";
import { DayOfWeekAvailability } from "./day-of-week-availability";

export type RetrieveResourceAvailabilityResponse<T> = {
  // List of days in the month with their respective availability data (includes day zero)
  days: Array<
    DayOfWeekAvailability & {
      // If there is a reservation for this day. Used for date-only resources
      hasAnyReservationInDay: boolean;
      // Available slots for this day. Used for time-slot resources
      availableSlots: Array<TimeRange>;
    }
  >;
  // List of all reservations in the given month
  reservations: Array<Reservation<T>>;
};
