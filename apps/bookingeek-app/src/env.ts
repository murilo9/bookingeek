const MODE = import.meta.env.MODE;
export const BASE_URL =
  MODE === "production"
    ? "https://api.bookingeek.com"
    : "http://localhost:4000";
export const SIGNIN_ROUTE = "/signin";
export const SIGNUP_ROUTE = "/signup";
