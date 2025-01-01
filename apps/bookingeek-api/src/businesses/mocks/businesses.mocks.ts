import { Business } from '../types';

export const BUSINNES_ID_0 = '6770598874a39884cfe9496a';
export const BUSINNES_ID_1 = '677059a374a39884cfe9496c';

/**
 * Returns an array of mocked businesses.
 * @param Id ID class constructor. Can be either String or ObjectId.
 * @returns
 */
export function BUSINESSES_MOCKS<T>(
  Id: new (id?: string) => T,
): Array<Business<T>> {
  return [
    {
      _id: new Id(BUSINNES_ID_0),
      created: new Date().getTime(),
      updated: new Date().getTime(),
      IS_DELETED: false,
      adminUserId: new Id(''),
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
      _id: new Id(BUSINNES_ID_1),
      created: new Date().getTime(),
      updated: new Date().getTime(),
      IS_DELETED: false,
      adminUserId: new Id(''),
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
}
