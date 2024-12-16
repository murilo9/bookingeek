import { ObjectId } from 'mongodb';
import { PersistentEntity } from 'src/database/types/persistent-entity';

export interface ReservationCancelKey extends PersistentEntity {
  // ID of the reservation this key belongs to
  reservationId: ObjectId;
}
