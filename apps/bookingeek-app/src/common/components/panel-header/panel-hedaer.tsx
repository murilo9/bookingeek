import styled from "styled-components";
import MobileOnly from "../responsive/mobile-only";
import DesktopOnly from "../responsive/desktop-only";

// Adds the border-bottom on desktop viewports
const StyledDesktopHeaderBorder = styled.div`
  @media screen and (min-width: 1024px) {
    border-bottom: 1px solid #bcbcbc;
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

// Header title
const StyledTitle = styled.h1`
  font-size: 16px;
  font-weight: 700;
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

type PanelHeaderProps = {
  viewTitle: string;
  businessName: string;
  businessPictureUrl: string;
  startSlot?: JSX.Element;
  endSlot?: JSX.Element;
};

export default function PanelHeader({
  viewTitle,
  startSlot,
  endSlot,
  businessName,
  businessPictureUrl,
}: PanelHeaderProps) {
  return (
    <StyledDesktopHeaderBorder>
      <StyledHeader>
        <MobileOnly>
          <>
            <StyledGrouper>
              {startSlot}
              <StyledTitle>{viewTitle}</StyledTitle>
            </StyledGrouper>
            {endSlot}
          </>
        </MobileOnly>
        <DesktopOnly>
          <>
            <StyledLogo>Bookingeek</StyledLogo>
            <StyledGrouper>
              <StyledBusinessName>{businessName}</StyledBusinessName>
              <StyledBusinessLogo src={businessPictureUrl} />
            </StyledGrouper>
          </>
        </DesktopOnly>
      </StyledHeader>
    </StyledDesktopHeaderBorder>
  );
}
