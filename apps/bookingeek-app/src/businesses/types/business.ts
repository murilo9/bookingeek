import { PersistentEntity } from "@bookingeek/core/common/types/persistent-entity";

export interface Business extends PersistentEntity<string> {
  // Business name
  name: string;
  // Business slug
  slug: string;
  // Business picture URL, if any
  pictureUrl: string | null;
  // Business address, if any
  address: string;
  // Business phone number, if any
  phone: string;
  // Business admin user ID (usually the first user created, during sign up)
  adminUserId: string;
  // Business Stripe connected account ID
  stripeConnectedAccountId: string | null;
  // Information about refunding policy
  refundingPolicy: {
    // Whether the business does refunds or not
    doesRefund: boolean;
    // Refund type
    refundType: "partial" | "total";
    // A short description about how refunds work, to be displayed to customers
    description: string;
  };
}
