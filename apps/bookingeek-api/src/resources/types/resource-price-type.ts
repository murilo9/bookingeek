export type ResorucePriceType =
  | 'hourly'
  | '30-min'
  | '15-min'
  | '10-min'
  | '5-min';

export const RESOURCE_PRICE_TYPES: Record<string, string> = {
  hourly: 'hour',
  '30-min': '30 min',
  '15-min': '15 min',
  '10-min': '10 min',
  '5-min': '5 min',
};
