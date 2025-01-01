import { ObjectId } from 'mongodb';
import { PersistentEntity } from 'src/common/types';

export interface ReservationCancelKey extends PersistentEntity<ObjectId> {
  // ID of the reservation this key belongs to
  reservationId: ObjectId;
}
