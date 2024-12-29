import { PersistentEntity } from '@bookingeek/core/common/types';
import { ObjectId } from 'mongodb';

/**
 * Represents the password of a user, used for signing in.
 */
export interface UserPassword extends PersistentEntity<ObjectId> {
  // The hashed password
  hash: string;
  // ID of the user the password belongs to
  userId: ObjectId;
}
