import styled from "styled-components";

const StyledHeaderBorder = styled.div`
  border-bottom: 1px solid #bcbcbc;
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
  }
`;

// The actual header container
const StyledHeader = styled.div`
  height: 52px;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1440px;
  margin: auto;

  @media screen and (min-width: 1024px) {
    padding: 0px 24px;
  }
`;

// Groups header's startSlot and title
const StyledGrouper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

// Header logo
const StyledLogo = styled.h1`
  font-size: 16px;
  font-weight: 500;
`;

const StyledBusinessName = styled.h1`
  font-size: 14px;
  font-weight: 600;
`;

const StyledBusinessLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  object-fit: cover;
`;

type DesktopHeaderProps = {
  businessName: string;
  businessPictureUrl: string;
};

/**
 * The bordered header that is only displayed on desktop viewports.
 */
export default function DesktopHeader({
  businessName,
  businessPictureUrl,
}: DesktopHeaderProps) {
  return (
    <StyledHeaderBorder>
      <StyledHeader>
        <StyledLogo>Bookingeek</StyledLogo>
        <StyledGrouper>
          <StyledBusinessName>{businessName}</StyledBusinessName>
          <StyledBusinessLogo src={businessPictureUrl} />
        </StyledGrouper>
      </StyledHeader>
    </StyledHeaderBorder>
  );
}
