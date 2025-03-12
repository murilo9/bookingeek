/**
 * The possible query string paramters passed to the ReservationsController:retrieveReservations route.
 */
export type RetrieveReservationsQuery = {
  // Reservation ID
  _id?: string;
  // Business ID
  businessId?: string;
  // Resource(s) ID(s) in 'id1,id2,id3' format
  resourceIds?: string;
};
