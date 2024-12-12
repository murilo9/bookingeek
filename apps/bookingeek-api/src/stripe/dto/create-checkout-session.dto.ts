import Stripe from 'stripe';

export type StripeLineItem = {
  price_data: {
    product_data: { name: string };
    currency: string;
    unit_amount: number;
  };
  quantity: number;
};

export type CreateCheckoutSessionDto = {
  // A list of the items with their respective quantities and product IDs
  lineItems: Array<StripeLineItem>;
  // Business' Stripe connected account ID
  businessConnectedAccountId: string;
  // Item metadata
  metadata?: Stripe.MetadataParam;
  // Platform fee, in cents
  platformFeeInCents: number;
};
