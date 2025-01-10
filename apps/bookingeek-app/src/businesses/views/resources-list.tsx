import styled from "styled-components";
import { useAuth } from "../../common/hooks/useAuth";
import ResourceItem from "../../resources/components/resource-item/resource-item";
import { useGetResourcesQuery } from "../../resources/resources-api";

const StyledResourcesList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
`;

/**
 * Lists the business' resources.
 */
export default function ResourcesListView() {
  const { user } = useAuth();
  const { data } = useGetResourcesQuery(user!.businessId);

  // TODO: loading state if data does not exist. Check isFetching and isLoading from useGetResourcesQuery as well
  return (
    <StyledResourcesList>
      {data?.map(
        ({
          picture,
          priceInCents,
          priceType,
          title,
          description,
          subtitle,
        }) => (
          <ResourceItem
            picture={picture}
            priceInCents={priceInCents}
            priceType={priceType}
            title={title}
            description={description}
            subtitle={subtitle}
          />
        )
      )}
    </StyledResourcesList>
  );
}
