import styled from "styled-components";
import { useActiveView } from "../../hooks/useActiveView";
import ResourcesIcon from "../../icons/resources";
import ReservationIcon from "../../icons/reservation";
import ReservationOutlinedIcon from "../../icons/reservation-outlined";
import ResourcesOutlinedIcon from "../../icons/resources-outlined";
import MenuIcon from "../../icons/menu";
import { useNavigate } from "react-router";

const StyledPanel = styled.div`
  display: flex;
  border-top: 1px solid #dddddd;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
  height: 48px;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const StyledPanelButton = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  &:active {
    background: #f4f4f4;
  }
`;

/**
 * Navigation bar displayed in mobile viewports.
 */
export default function PanelMobileNavigationMenu() {
  const activeView = useActiveView();

  const navigate = useNavigate();

  return (
    <StyledPanel>
      <StyledPanelButton onClick={() => navigate("/resources")}>
        {activeView.route === "resources" ? (
          <ResourcesIcon />
        ) : (
          <ResourcesOutlinedIcon />
        )}
      </StyledPanelButton>
      <StyledPanelButton onClick={() => navigate("/reservations")}>
        {activeView.route === "reservations" ? (
          <ReservationIcon />
        ) : (
          <ReservationOutlinedIcon />
        )}
      </StyledPanelButton>
      <StyledPanelButton>
        <MenuIcon />
      </StyledPanelButton>
    </StyledPanel>
  );
}
