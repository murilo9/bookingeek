import { useLocation } from "react-router";
import { useGetResourcesQuery } from "../store/resources-api";
import { useAuth } from "./useAuth";
import { Resource } from "@bookingeek/core";

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
  selectedResource?: Resource<string>;
} => {
  const { user } = useAuth();
  const { data } = useGetResourcesQuery({ businessId: user!.businessId });
  const location = useLocation();
  const routeList = location.pathname.split("/");
  const route = routeList[1];
  const entityId = routeList[2];
  const selectedResource =
    route === "resources"
      ? data?.find((resource) => resource._id === entityId)
      : undefined;
  const title = VIEWS[route];
  const params = routeList.filter((_, index) => index > 1);

  return { route, title, params, selectedResource };
};
