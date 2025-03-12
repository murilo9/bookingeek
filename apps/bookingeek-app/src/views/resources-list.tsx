import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import ResourceItem from "../components/domain/resource-item";
import { useGetResourcesQuery } from "../store/resources-api";
import { useNavigate } from "react-router";

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
  const { data: resources, isLoading } = useGetResourcesQuery({
    businessId: user!.businessId,
  });
  const navigate = useNavigate();

  return (
    <StyledResourcesList>
      {isLoading
        ? "Loading..."
        : resources?.length
          ? resources.map(
              ({
                picture,
                priceInCents,
                priceTypeMinutes,
                title,
                description,
                subtitle,
                _id,
              }) => (
                <ResourceItem
                  picture={picture}
                  priceInCents={priceInCents}
                  priceTypeMinutes={priceTypeMinutes}
                  title={title}
                  description={description}
                  subtitle={subtitle}
                  onClick={() => navigate(`/resources/${_id}`)}
                />
              )
            )
          : "You have no resources yet."}
    </StyledResourcesList>
  );
}
