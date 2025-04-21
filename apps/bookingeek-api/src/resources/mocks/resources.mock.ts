import { Resource, TimeRange } from '@bookingeek/core';
import { BUSINNES_ID_0 } from 'src/businesses/mocks/businesses.mocks';

const basicAvailabilityRule: TimeRange = {
  startTimeInMinutesPastMidnight: 60 * 8,
  endTimeInMinutesPastMidnight: 60 * 18,
};

export const RESOURCE_ID_0 = '677059a374a39884cfe9496c';
export const RESOURCE_ID_1 = '677059ab74a39884cfe9496d';

export function RESOURCES_MOCK<T>(
  Id: new (id?: string) => T,
): Array<Resource<T>> {
  return [
    {
      _id: new Id(RESOURCE_ID_0),
      created: new Date().getTime(),
      updated: new Date().getTime(),
      IS_DELETED: false,
      isActive: true,
      availability: {
        sunday: {
          available: true,
          rules: [],
        },
        monday: {
          available: true,
          rules: [basicAvailabilityRule],
        },
        tuesday: {
          available: true,
          rules: [basicAvailabilityRule],
        },
        wednesday: {
          available: true,
          rules: [basicAvailabilityRule],
        },
        thursday: {
          available: true,
          rules: [basicAvailabilityRule],
        },
        friday: {
          available: true,
          rules: [basicAvailabilityRule],
        },
        saturday: {
          available: true,
          rules: [],
        },
      },
      availabilityType: 'date-time',
      businessId: new Id(BUSINNES_ID_0),
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
      picture: {
        icon: 'user',
        src: [''],
      },
      priceInCents: 4000,
      priceTypeMinutes: 60,
      subtitle: 'Barber',
      reservationTimeGranularityMinutes: 60,
      reservationTimeType: 'ranges',
      title: 'Joe',
      unavailability: [],
      slug: 'joe',
    },
    {
      _id: new Id(RESOURCE_ID_1),
      created: new Date().getTime(),
      updated: new Date().getTime(),
      IS_DELETED: false,
      isActive: true,
      availability: {
        sunday: {
          available: true,
          rules: [],
        },
        monday: {
          available: true,
          rules: [basicAvailabilityRule],
        },
        tuesday: {
          available: true,
          rules: [basicAvailabilityRule],
        },
        wednesday: {
          available: true,
          rules: [basicAvailabilityRule],
        },
        thursday: {
          available: true,
          rules: [basicAvailabilityRule],
        },
        friday: {
          available: true,
          rules: [basicAvailabilityRule],
        },
        saturday: {
          available: true,
          rules: [],
        },
      },
      availabilityType: 'date-time',
      businessId: new Id(BUSINNES_ID_0),
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
      picture: {
        icon: 'user',
        src: [],
      },
      priceInCents: 4000,
      priceTypeMinutes: 60,
      subtitle: 'Barber',
      reservationTimeGranularityMinutes: 60,
      reservationTimeType: 'ranges',
      title: 'Jylan',
      unavailability: [],
      slug: 'jylan',
    },
  ];
}
