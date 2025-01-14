import { ObjectId } from 'mongodb';
import { Timestamp } from 'src/common/types';

/**
 * The fields that can be passed in a reservations search query.
 * Used in ReservationsProvider:retrieveReservations method.
 */
export class RetrieveReservationsDto {
  // Minimum creation date of a reservation
  startDateTimestamp?: Timestamp;
  // Maximum creation date of a reservation
  endDateTimestamp?: Timestamp;
  // Reservations' business ID
  businessId: string;
  // Any resource(s) a reservation should belong to
  resourceIds?: Array<ObjectId>;
}
