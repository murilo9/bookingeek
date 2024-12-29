import { BUSINNES_ID_0 } from 'src/businesses/businesses.mocks';
import { Resource } from './entities/resource';
import { ObjectId } from 'mongodb';
import { TimeRange } from 'src/common/types/time-range';

const basicAvailabilityRule: TimeRange = {
  startInMinutesPastMidnight: 60 * 8,
  endInMinutesPastMidnight: 60 * 18,
};

export const RESOURCE_ID_0 = new ObjectId('677059a374a39884cfe9496c');
export const RESOURCE_ID_1 = new ObjectId('677059ab74a39884cfe9496d');

export const RESOURCES_MOCK: Array<Resource> = [
  {
    _id: RESOURCE_ID_0,
    created: new Date().getTime(),
    updated: new Date().getTime(),
    IS_DELETED: false,
    availability: {
      '0': {
        available: true,
        rules: [],
      },
      '1': {
        available: true,
        rules: [basicAvailabilityRule],
      },
      '2': {
        available: true,
        rules: [basicAvailabilityRule],
      },
      '3': {
        available: true,
        rules: [basicAvailabilityRule],
      },
      '4': {
        available: true,
        rules: [basicAvailabilityRule],
      },
      '5': {
        available: true,
        rules: [basicAvailabilityRule],
      },
      '6': {
        available: true,
        rules: [],
      },
    },
    availabilityType: 'date-time',
    businessId: BUSINNES_ID_0,
    checkoutType: 'in-loco-online',
    customPrices: [],
    description: '',
    extraFields: [],
    minimalReservationAdvance: {
      amount: 1,
      unit: 'hours',
    },
    minimalReservationDuration: {
      amount: 1,
      unit: 'hours',
    },
    pictureUrl: {
      icon: '',
      src: [''],
    },
    priceInCents: 4000,
    priceType: 'hourly',
    subtitle: 'Barber',
    reservationTimeGranularity: 'hour',
    reservationTimeType: 'ranges',
    title: 'Joe',
    unavailability: [],
  },
  {
    _id: RESOURCE_ID_1,
    created: new Date().getTime(),
    updated: new Date().getTime(),
    IS_DELETED: false,
    availability: {
      '0': {
        available: true,
        rules: [],
      },
      '1': {
        available: true,
        rules: [basicAvailabilityRule],
      },
      '2': {
        available: true,
        rules: [basicAvailabilityRule],
      },
      '3': {
        available: true,
        rules: [basicAvailabilityRule],
      },
      '4': {
        available: true,
        rules: [basicAvailabilityRule],
      },
      '5': {
        available: true,
        rules: [basicAvailabilityRule],
      },
      '6': {
        available: true,
        rules: [],
      },
    },
    availabilityType: 'date-time',
    businessId: BUSINNES_ID_0,
    checkoutType: 'in-loco-online',
    customPrices: [],
    description: '',
    extraFields: [],
    minimalReservationAdvance: {
      amount: 1,
      unit: 'hours',
    },
    minimalReservationDuration: {
      amount: 1,
      unit: 'hours',
    },
    pictureUrl: {
      icon: '',
      src: [''],
    },
    priceInCents: 4000,
    priceType: 'hourly',
    subtitle: 'Barber',
    reservationTimeGranularity: 'hour',
    reservationTimeType: 'ranges',
    title: 'Jylan',
    unavailability: [],
  },
];
