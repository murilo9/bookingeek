import { ObjectId } from 'mongodb';
import { PersistentEntity } from 'src/database/types/persistent-entity';

/**
 * Represents a business that can create resources.
 */
export interface Business extends PersistentEntity {
  // Business name
  name: string;
  // Business picture URL, if any
  pictureUrl: string | null;
  // Business address, if any
  address: string;
  // Business phone number, if any
  phone: string;
  // Business admin user ID (usually the first user created, during sign up)
  adminUserId: ObjectId;
  // Business Stripe connected account ID
  stripeConnectedAccountId: string | null;
}
