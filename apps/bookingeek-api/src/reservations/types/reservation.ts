import { PersistentEntity } from 'src/common/types';

/**
 * Represents a reservation of a resource by a customer.
 */
export interface Reservation<T> extends PersistentEntity<T> {
  // Reservation code number
  code: number;
  // The resource being reserved
  resourceId: T;
  // A "picture" of the resource on the time of the reservation
  resourceJSON: string;
  // Reservation start date's timestamp (used mainly for DB filtering purposes)
  startDateTimestamp: number;
  // Reservation end date's timestamp (used mainly for DB filtering purposes)
  endDateTimestamp: number;
  // Reservation type
  type: 'date' | 'date-time';
  // Reservation start date data
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  // Reservation end date data
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  // Start time, in minutes past midnight. Only applies if type = 'date-time'
  startTimeInMinutesPastMidnight: number | null;
  // End time, in minutes past midnight. Only applies if type = 'date-time'
  endTimeInMinutesPastMidnight: number | null;
  // Customer's data
  customerData: {
    fullName: string;
    email: string;
  };
  // Extra data fields, if any
  extraFields: Record<string, string | boolean>;
  // Checkout option chosen by the customer
  checkoutOptionChosen: 'online' | 'in-loco';
  // Reservation's Stripe payment intent ID (if checkout is completed)
  stripePaymentIntentId: string | null;
  // Reservation's payment status
  paymentStatus: 'pending' | 'processing' | 'success';
  // Whether the reservation was cancelled by either the customer or the business
  cancelledBy: null | 'business' | 'customer';
  // Stripe checkout session's client ID, used for rendering the embedded checkout form in the frontend.
  // Only applies if resource's checkoutOptionChosen = 'online'
  checkoutSessionClientId: string | null;
  // The total amount refunded. Can only ben non-zero when reservation paymentStatus = 'success' & stripePaymentIntent != null
  refundedAmountInCents: number;
}
