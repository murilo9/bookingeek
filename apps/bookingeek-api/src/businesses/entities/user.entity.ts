import { ObjectId } from 'mongodb';
import { PersistentEntity } from 'src/database/types/persistent-entity';

/**
 * Represents a business' employee that can sign in
 */
export interface User extends PersistentEntity {
  // User email
  email: string;
  // User name
  name: string;
  // ID of the business this user belongs to
  businessId: ObjectId;
}
