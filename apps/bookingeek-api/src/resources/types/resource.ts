import { DayOfWeekAvailability } from './day-of-week-availability';
import { ResourceExtraField } from './resource-extra-field';
import { CustomPriceRule } from './custom-price-rule';
import { PersistentEntity } from '../../common/types/persistent-entity';
import { ResorucePriceType } from './resource-price-type';
import { ResourceCheckoutType } from './resource-checkout-type';
import { ResourcePicture } from '.';
import { MinimalReservationAdvance } from './minimal-reservation-advance';

/**
 * Represents an entity (service, venue, vehicle, worker, etc) that can be booked.
 */
export interface Resource<T> extends PersistentEntity<T> {
  // Resource's title
  title: string;
  // Resource's slug
  slug: string;
  // Resource's subtitle (can be empty)
  subtitle: string;
  // Resource's description (can be empty)
  description: string;
  // Resource's picture data (icon or image)
  picture: ResourcePicture;
  // The business this resource belongs to
  businessId: T;
  // Price in cents, per priceType unit
  priceInCents: number | null;
  // Price unit. Only applies if price != null and availabilityType = 'date-time'
  priceType: ResorucePriceType;
  // How customers can pay
  checkoutType: ResourceCheckoutType;
  // Extra fields of data to be prompted to customers when making reservations, if any
  extraFields: Array<ResourceExtraField>;
  // Type of availability (date & times or dates only)
  availabilityType: 'date-time' | 'date-only';
  // Type of availability. Only applies if availabilityType = 'date-time'
  reservationTimeType: 'ranges' | 'slots';
  // Reservation time granularity. Only applies if availabilityType = 'date-time'
  reservationTimeGranularity: ResorucePriceType;
  // Minimal duration of reservations. Only applies if timeType = 'ranges'
  minimalReservationDuration: {
    amount: number;
    unit: 'hours' | 'minutes';
  };
  // Minimum advance time for making reservations
  minimalReservationAdvance: MinimalReservationAdvance;
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
  unavailability: Array<CustomPriceRule>;
  // Resources custom prices for specific days, if any
  customPrices: Array<CustomPriceRule>;
}
