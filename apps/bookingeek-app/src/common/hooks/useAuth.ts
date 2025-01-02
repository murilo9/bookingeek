import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "@bookingeek/api/src/businesses/types";

/**
 * Gives authentication data (access token) and logged business user data, if any.
 */
export const useAuth = () => ({
  accessToken: Cookies.get("access_token"),
  user: Cookies.get("access_token")
    ? (jwtDecode(Cookies.get("access_token")!) as User<string>)
    : null,
  signIn(accessToken: string) {
    Cookies.set("access_token", accessToken);
  },
  signOut() {
    Cookies.remove("access_token");
  },
});
