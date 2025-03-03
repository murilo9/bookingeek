/**
 * Tells whether a price string is valid.
 */
export const isPriceValid = (price: string) =>
  new RegExp(/^(0(?!\.00)|[0-9]\d{0,6})\.\d{2}$/).test(price);
