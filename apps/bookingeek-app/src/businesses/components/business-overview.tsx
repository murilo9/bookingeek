import { Business } from "@bookingeek/api/src/businesses/types";
import styled from "styled-components";
import { DEFAULT_BUSINESS_PICTURE_URL } from "../../common/data/constants";

type BusinessOverviewProps = {
  business: Business<string>;
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const StyledBusinessPicture = styled.img<{ noBorder?: boolean }>`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: ${(props) => (props.noBorder ? "0" : "50%")};
`;

const StyledBusinessTitle = styled.h1`
  font-size: 14px;
  font-weight: 700;
  color: #666666;
`;

export default function BusinessOverview({ business }: BusinessOverviewProps) {
  return (
    <StyledContainer>
      <StyledBusinessPicture
        src={business.pictureUrl || DEFAULT_BUSINESS_PICTURE_URL}
        alt="Logo"
        noBorder={business.pictureUrl === null}
      />
      <StyledBusinessTitle>{business.name}</StyledBusinessTitle>
    </StyledContainer>
  );
}
