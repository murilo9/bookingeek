/**
 * Build a query string based on a filter object. Does NOT add the initial '?' character.
 */
export const buildQueryString = (params: object): string =>
  Object.entries(params)
    // Removes value equal to null or undefined
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => key + "=" + value)
    .join("&");
