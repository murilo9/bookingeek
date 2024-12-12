import { ObjectId } from 'mongodb';

export interface PersistentEntity {
  _id: ObjectId;
  created: number;
  updated: number;
  IS_DELETED: boolean;
}
