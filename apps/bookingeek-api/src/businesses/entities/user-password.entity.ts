import { ObjectId } from 'mongodb';
import { PersistentEntity } from 'src/database/types/persistent-entity';

/**
 * Represents the password of a user, used for signing in.
 */
export interface UserPassword extends PersistentEntity {
  // The hashed password
  hash: string;
  // ID of the user the password belongs to
  userId: ObjectId;
}
