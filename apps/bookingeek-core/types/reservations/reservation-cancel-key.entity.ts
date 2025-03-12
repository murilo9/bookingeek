import { PersistentEntity } from "../common";

export interface ReservationCancelKey<T> extends PersistentEntity<T> {
  // ID of the reservation this key belongs to
  reservationId: T;
}
