import { ResourceExtraField } from './resource-extra-field';
import { CustomPriceRule } from './custom-price-rule';
import { PersistentEntity } from '../../common/types/persistent-entity';
import { ResourceCheckoutType } from './resource-checkout-type';
import { DayOfWeekAvailability, ResourcePicture } from '.';
import { MinimalReservationAdvance } from './minimal-reservation-advance';

import { DayOfWeekName } from 'src/common/types';
import { MinimalReservationDuration } from './minimal-reservation-duration';
import { ReservationTimeGranularity } from './reservartion-time-granularity';

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
  priceTypeMinutes: ReservationTimeGranularity;
  // How customers can pay
  checkoutType: ResourceCheckoutType;
  // Extra fields of data to be prompted to customers when making reservations, if any
  extraFields: Array<ResourceExtraField>;
  // Type of availability (date & times or dates only)
  availabilityType: 'date-time' | 'date-only';
  // Type of availability. Only applies if availabilityType = 'date-time'
  reservationTimeType: 'ranges' | 'slots';
  // Reservation time granularity. Only applies if availabilityType = 'date-time'
  reservationTimeGranularityMinutes: ReservationTimeGranularity;
  // Minimal duration of reservations. Only applies if timeType = 'ranges'
  minimalReservationDuration: MinimalReservationDuration;
  // Minimum advance time for making reservations
  minimalReservationAdvance: MinimalReservationAdvance;
  // Resource's availability rules
  availability: Record<DayOfWeekName, DayOfWeekAvailability>;
  // Resource's unavailability rules, if any
  unavailability: Array<CustomPriceRule>;
  // Resources custom prices for specific days, if any
  customPrices: Array<CustomPriceRule>;
}
