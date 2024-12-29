export interface PersistentEntity<T> {
  _id: T;
  created: number;
  updated: number;
  IS_DELETED: boolean;
}
