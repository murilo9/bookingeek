import { PersistentEntity } from "../common";

/**
 * Represents a business' employee that can sign in
 */
export interface User<T> extends PersistentEntity<T> {
  // User email
  email: string;
  // User name
  name: string;
  // ID of the business this user belongs to
  businessId: T;
}
