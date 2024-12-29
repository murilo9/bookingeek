import { ObjectId } from 'mongodb';
import { Business } from '@bookingeek/core/businesses/types/business';

export const BUSINNES_ID_0 = new ObjectId('6770598874a39884cfe9496a');
export const BUSINNES_ID_1 = new ObjectId('677059a374a39884cfe9496c');

export const BUSINESSES_MOCKS: Array<Business<ObjectId>> = [
  {
    _id: BUSINNES_ID_0,
    created: new Date().getTime(),
    updated: new Date().getTime(),
    IS_DELETED: false,
    adminUserId: new ObjectId(),
    address: '40 ave, 328, New York',
    name: "Joe's Barber Shop",
    phone: '3825416946',
    pictureUrl: '',
    refundingPolicy: {
      description: 'No refunds',
      doesRefund: false,
      refundType: 'total',
    },
    slug: 'joes-barber-shop',
    stripeConnectedAccountId: 'stripe-connected-account-id',
  },
  {
    _id: BUSINNES_ID_1,
    created: new Date().getTime(),
    updated: new Date().getTime(),
    IS_DELETED: false,
    adminUserId: new ObjectId(),
    address: '48 street, 119, Boston',
    name: "Robinski's Venue",
    phone: '3465596588',
    pictureUrl: '',
    refundingPolicy: {
      description: '80% within 3 days in advance',
      doesRefund: true,
      refundType: 'partial',
    },
    slug: 'robinkis-venue',
    stripeConnectedAccountId: 'stripe-connected-account-id',
  },
];
