/**
 * Represents any entity that is stored in the database.
 * T = type of the _id attribute (can be either string or ObjectId).
 */
export interface PersistentEntity<T> {
  _id: T;
  created: number;
  updated: number;
  IS_DELETED: boolean;
}
