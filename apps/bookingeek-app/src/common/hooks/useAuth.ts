import Cookies from "js-cookie";

export const useAuth = () => ({
  accessToken: Cookies.get("access_token"),
  signIn(accessToken: string) {
    Cookies.set("access_token", accessToken);
  },
  signOut() {
    Cookies.remove("access_token");
  },
});
