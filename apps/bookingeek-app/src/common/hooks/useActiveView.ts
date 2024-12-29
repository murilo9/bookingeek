import { useLocation } from "react-router";

const VIEWS: Record<string, string> = {
  resources: "Resources",
  reservations: "Reservations",
  business: "Business",
  account: "Account",
  users: "Users",
};

export const useActiveView = () => {
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const title = VIEWS[route];

  return { route, title };
};
