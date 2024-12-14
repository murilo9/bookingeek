/**
 * An extra field of data to be prompted to users while making a reservation.
 */
export type ResourceExtraField = {
  // Field title
  title: string;
  // Field type
  type: 'text' | 'text-long' | 'options-radio' | 'options-select' | 'checkbox';
  // Field options. Only applies if type = 'options-radio' || ''options-select'
  options?: Array<string>;
};
