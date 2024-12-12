import { ObjectId } from 'mongodb';

export type User = {
  email: string;
  name: string;
  businessId: ObjectId;
};

export type Business = {
  name: string;
  pictureUrl: string;
  address: string;
  phone: string;
  adminUserId: ObjectId;
  stripeConnectedAccountId: string | null;
};

type ResourceIconPicture = {
  icon: string;
};

type ResourceUrlPicture = {
  src: Array<string>;
};

type ResourcePicture = ResourceUrlPicture | ResourceIconPicture;

type ResourceExtraField = {
  title: string;
  type: 'text' | 'text-long' | 'options-radio' | 'options-select' | 'checkbox';
  options?: Array<string>;
};

type TimeRange = {
  startInMinutesPastMidnight: number;
  endInMinutesPastMidnight: number;
};

type DayOfWeekAvailability = {
  // Whether this day of week is available
  available: boolean;
  // Available time ranges. Only applies if timeType = 'ranges'
  rules: Array<TimeRange>;
};

type UnavailabilityRule = {
  // Unavailability rule month
  month: number;
  // Unavailability rule day
  day: number;
  // Unavailability rule times. Only applies if resource's availabilityType = 'date-time'
  times: Array<TimeRange>;
};

type CustomPriceRule = {
  // Unavailability rule month
  month: number;
  // Unavailability rule day
  day: number;
  // Unavailability rule times. Only applies if resource's availabilityType = 'date-time'
  times: Array<TimeRange>;
};

export type Resource = {
  // Resource's title
  title: string;
  // Resource's subtitle (can be empty)
  subtitle: string;
  // Resource's description (can be empty)
  description: string;
  // Resource's picture data (icon or image)
  pictureUrl: ResourcePicture;
  // The business this resource belongs to
  businessId: ObjectId;
  price: number | null;
  // Price unit. Only applies if price != null
  priceType: 'hourly' | '30-min' | '15-min' | '10-min' | '5-min';
  // How customers can pay
  checkoutType: 'in-loco-online' | 'online-only' | 'in-loco-only';
  // Extra fields of data to be prompted to customers when making reservations, if any
  extraFields: Array<ResourceExtraField>;
  // Type of availability (date & times or dates only)
  availabilityType: 'date-time' | 'date-only';
  // Type of availability. Only applies if type = 'date-time'
  timeType: 'ranges' | 'slots';
  // Time granularity. Only applies if type = 'date-time'
  timeGranularity: '5-min' | '10-min' | '15-min' | '30-min' | 'hour';
  // Minimal duration of reservations. Only applies if timeType = 'ranges'
  minimalReservationDuration: {
    amount: number;
    unit: 'hours' | 'minutes';
  };
  // Minimum advance time for making reservations
  minimalReservationAdvance: {
    amount: number;
    unit: 'weeks' | 'days' | 'hours' | 'minutes';
  };
  // Resource's availability rules
  availability: {
    '0': DayOfWeekAvailability; // Sunday
    '1': DayOfWeekAvailability; // Monday
    '2': DayOfWeekAvailability; // Tuesday
    '3': DayOfWeekAvailability; // Wednesday
    '4': DayOfWeekAvailability; // Thursday
    '5': DayOfWeekAvailability; // Friday
    '6': DayOfWeekAvailability; // Saturday
  };
  // Resource's unavailability rules, if any
  unavailability: Array<UnavailabilityRule>;
  // Resources custom prices for specific days, if any
  customPrices: Array<CustomPriceRule>;
};

export type Reservation = {
  // The resource being reserved
  resourceId: ObjectId;
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
};
