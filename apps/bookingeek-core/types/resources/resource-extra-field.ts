import { ResourceExtraFieldType } from "./resource-extra-field-type";

/**
 * An extra field of data to be prompted to users while making a reservation.
 */
export class ResourceExtraField {
  // Field title
  title: string;
  // Field type
  type: ResourceExtraFieldType;
  // Field options. Only applies if type = 'options-radio' || ''options-select'
  options?: Array<string>;
}
