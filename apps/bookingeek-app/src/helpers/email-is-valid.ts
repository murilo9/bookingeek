export const emailIsValid = (email: string) =>
  new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
