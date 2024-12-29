import { PersistentEntity } from '@bookingeek/core/common/types/persistent-entity';
import { ObjectId } from 'mongodb';

export interface ReservationCancelKey extends PersistentEntity<ObjectId> {
  // ID of the reservation this key belongs to
  reservationId: ObjectId;
}
