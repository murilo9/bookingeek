import { findCustomPriceForReservation } from "./find-custom-price-for-reservation";
import { Reservation, FromPersistentEntity, Resource } from "../../types";
import { getReservationTotalDurationInMinutes } from "./get-reservation-total-duration-in-minutes";

export function getReservationPriceTotal<T>(
  reservation: Omit<Reservation<T>, FromPersistentEntity>,
  resource: Resource<T>
): number {
  const { priceInCents, priceTypeMinutes } = resource;
  if (priceInCents === null) {
    throw new Error("Resource's priceInCents is null");
  }
  // Checks if any custom price applies for the given date and time
  let defaultPriceInCents = priceInCents;
  const customPriceRuleFound = findCustomPriceForReservation<T>(
    reservation as Reservation<T>,
    resource
  );
  // Applies the custom price, if any
  if (customPriceRuleFound) {
    defaultPriceInCents = customPriceRuleFound.priceInCents;
  }
  // If resource availability is for whole day, returns priceInCents purely
  if (resource.availabilityType === "date-only") {
    return priceInCents;
  }
  // If resource availability is granular whithin the day, calculates the price based on the duration in minutes
  else {
    // Calculates default price
    const reservationDurationInMinutes = getReservationTotalDurationInMinutes(
      reservation as Reservation<T>
    );
    const totalPriceInCents =
      defaultPriceInCents * (reservationDurationInMinutes / priceTypeMinutes);
    return totalPriceInCents;
  }
}
