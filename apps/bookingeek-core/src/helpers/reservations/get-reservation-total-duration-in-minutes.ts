import { Reservation } from "../../types";

export function getReservationTotalDurationInMinutes<T>(
  reservation: Reservation<T>
): number {
  const { startTimeInMinutesPastMidnight, endTimeInMinutesPastMidnight } =
    reservation;
  const reservationDurationInMinutes =
    endTimeInMinutesPastMidnight - startTimeInMinutesPastMidnight;
  return reservationDurationInMinutes;
}
