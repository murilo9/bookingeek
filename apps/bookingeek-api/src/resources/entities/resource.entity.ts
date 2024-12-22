import { PersistentEntity } from 'src/database/types/persistent-entity';
import { DayOfWeekAvailability } from '../types/day-of-week-availability';
import { ObjectId } from 'mongodb';
import { ResourcePicture } from '../types/resource-picture';
import { ResourceExtraField } from '../types/resource-extra-field';
import { CustomPriceRule } from '../types/custom-price-rule';

/**
 * Represents an entity (service, venue, vehicle, worker, etc) that can be booked.
 */
export interface Resource extends PersistentEntity {
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
  // Type of availability. Only applies if availabilityType = 'date-time'
  timeType: 'ranges' | 'slots';
  // Time granularity. Only applies if availabilityType = 'date-time'
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
  unavailability: Array<CustomPriceRule>;
  // Resources custom prices for specific days, if any
  customPrices: Array<CustomPriceRule>;
}
