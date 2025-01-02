import { useAuth } from "../../common/hooks/useAuth";
import { useGetResourcesQuery } from "../../resources/resources-api";

/**
 * Lists the business' resources.
 */
export default function ResourcesManagementView() {
  const { user } = useAuth();
  const { data } = useGetResourcesQuery(user!.businessId);

  // TODO: loading state if data does not exist. Check isFetching and isLoading from useGetResourcesQuery as well
  return (
    <>
      <h2>Resources Management View</h2>
      <p>Resources will be listed here in order to be managed</p>
      {data?.map((business) => <p>{business.title}</p>)}
    </>
  );
}
