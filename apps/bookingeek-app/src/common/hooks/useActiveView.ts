import { useLocation } from "react-router";

const VIEWS: Record<string, string> = {
  resources: "Resources",
  reservations: "Reservations",
  business: "Business",
  account: "Account",
  users: "Users",
};

/**
 * Retrieves the name of the current view (and list of parameters, if any), based on the URL
 */
export const useActiveView = (): {
  route: string;
  title: string;
  params: Array<string>;
} => {
  const location = useLocation();
  const routeList = location.pathname.split("/");
  const route = routeList[1];
  const title = VIEWS[route];
  const params = routeList.filter((_, index) => index > 1);

  return { route, title, params };
};
