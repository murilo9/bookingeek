/**
 * The possible query string paramters passed to the ReservationsController:retrieveReservations route.
 */
export class RetrieveReservationsQuery {
  _id?: string;
  // Start date timestamp
  startDate?: string;
  // End date timestamp
  endDate?: string;
  // Business ID
  businessId?: string;
  // Resource(s) ID(s) in 'id1,id2,id3' format
  resourceId?: string;
}
