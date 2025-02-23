import { FromPersistentEntity } from 'src/database/types/from-persistent-entity';
import { Reservation } from '../types';
import { Resource } from 'src/resources/types';
import { ObjectId } from 'mongodb';
import { findCustomPriceForReservation } from './find-custom-price-for-reservation';
import { getReservationTotalDurationInMinutes } from './get-reservation-total-duration-in-minutes';

export const getReservationPriceTotal = (
  reservation: Omit<Reservation<ObjectId>, FromPersistentEntity>,
  resource: Resource<ObjectId>,
): number => {
  const { priceInCents, priceTypeMinutes } = resource;
  // Checks if any custom price applies for the given date and time
  let defaultPriceInCents = priceInCents;
  const customPriceRuleFound = findCustomPriceForReservation<ObjectId>(
    reservation as Reservation<ObjectId>,
    resource,
  );
  // Applies the custom price, if any
  if (customPriceRuleFound) {
    defaultPriceInCents = customPriceRuleFound.priceInCents;
  }
  // If resource availability is for whole day, returns priceInCents purely
  if (resource.availabilityType === 'date-only') {
    return priceInCents;
  }
  // If resource availability is granular whithin the day, calculates the price based on the duration in minutes
  else {
    // Calculates default price
    const reservationDurationInMinutes = getReservationTotalDurationInMinutes(
      reservation as Reservation<ObjectId>,
    );
    const totalPriceInCents =
      defaultPriceInCents * (reservationDurationInMinutes / priceTypeMinutes);
    return totalPriceInCents;
  }
};
