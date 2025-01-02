import styled from "styled-components";

// The actual header container
const StyledHeader = styled.div`
  height: 56px;
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  background: #ffffff;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  margin: auto;
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

type PanelHeaderProps = {
  viewTitle: string;
  startSlot?: JSX.Element;
  endSlot?: JSX.Element;
  bottomSlot?: JSX.Element;
};

/**
 * The header that is displayed inside views, both on mobile and desktop.
 */
export default function ViewHeader({
  viewTitle,
  startSlot,
  endSlot,
}: PanelHeaderProps) {
  return (
    <StyledHeader>
      <StyledGrouper>
        {startSlot}
        <StyledTitle>{viewTitle}</StyledTitle>
      </StyledGrouper>
      {endSlot}
    </StyledHeader>
  );
}
