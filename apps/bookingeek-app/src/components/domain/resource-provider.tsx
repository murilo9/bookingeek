import { Outlet, useParams } from "react-router";
import { useGetResourcesQuery } from "../../store/resources-api";
import { useAuth } from "../../hooks/useAuth";

export default function ResourceProvider() {
  const { resourceId } = useParams();
  const { user } = useAuth();
  if (!user) {
    throw new Error("ResourceProvider: could not retrieve value of user!");
  }

  const { isLoading, isFetching, data } = useGetResourcesQuery(
    user!.businessId
  );
  const resource = data?.find(
    (resourceItem) => resourceItem._id === resourceId
  );

  if (isLoading || isFetching) {
    return "Loading resource...";
  }
  if (!resource) {
    return "Resource not found";
  }
  return <Outlet context={resource} />;
}
