import styled from "styled-components";
import { useActiveView } from "../../hooks/useActiveView";
import ResourcesIcon from "../../icons/resources";
import ReservationIcon from "../../icons/reservation";
import ReservationOutlinedIcon from "../../icons/reservation-outlined";
import ResourcesOutlinedIcon from "../../icons/resources-outlined";
import MenuIcon from "../../icons/menu";
import { Link, useNavigate } from "react-router";
import InfoIcon from "../../icons/info";
import InfoOutlinedIcon from "../../icons/info-outlined";
import KeyIcon from "../../icons/key";
import KeyOutlinedIcon from "../../icons/key-outlined";
import UsersIcon from "../../icons/users";
import UsersOutlinedIcon from "../../icons/users-outlined";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import SignoutIcon from "../../icons/signout";

const StyledPanelWrapper = styled.div<{ showMenu: boolean }>`
  left: 0;
  top: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: ${(props) => (props.showMenu ? "100vh" : "auto")};
  position: ${(props) => (props.showMenu ? "fixed" : "static")};

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const StyledWrapperOverlay = styled.div`
  width: 100%;
  flex: 1;
`;

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  border-top: 1px solid #dddddd;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  width: 100%;
`;

const StyledPanelBar = styled.div`
  display: flex;
  width: 100%;
`;

const StyledPanelButton = styled.div`
  height: 48px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  &:active {
    background: #f4f4f4;
  }
`;

const StyledCollapseMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
`;

const StyledCollsapeMenuItem = styled.div`
  display: flex;
  align-items: center;
  border-radius: 24px;
  gap: 16px;
  padding: 8px 16px;
  color: #222;
  &:active {
    background: #f4f4f4;
  }
`;

const MENU_ITEMS = [
  {
    title: "Resources",
    icon: <ResourcesOutlinedIcon />,
    iconActive: <ResourcesIcon />,
    href: "/resources",
  },
  {
    title: "Reservations",
    icon: <ReservationOutlinedIcon />,
    iconActive: <ReservationIcon />,
    href: "/reservations",
  },
  {
    title: "Business Data",
    icon: <InfoOutlinedIcon />,
    iconActive: <InfoIcon />,
    href: "/business",
  },
  {
    title: "Users",
    icon: <UsersOutlinedIcon />,
    iconActive: <UsersIcon />,
    href: "/users",
  },
  {
    title: "Account",
    icon: <KeyOutlinedIcon />,
    iconActive: <KeyIcon />,
    href: "/account",
  },
];

/**
 * Navigation bar displayed in mobile viewports.
 */
export default function PanelMobileNavigationMenu() {
  const activeView = useActiveView();
  const navigate = useNavigate();
  const { route } = useActiveView();
  const [showMenu, setShowMenu] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    window.location.href = "/";
  };

  // Closes the collapse menu every time active view changes
  useEffect(() => {
    setShowMenu(false);
  }, [route]);

  return (
    <StyledPanelWrapper showMenu={showMenu}>
      <StyledWrapperOverlay onClick={() => setShowMenu(false)} />
      <StyledPanel>
        {showMenu ? (
          <StyledCollapseMenu>
            {MENU_ITEMS.map((item) => (
              <Link to={item.href}>
                <StyledCollsapeMenuItem>
                  {item.icon}
                  {item.title}
                </StyledCollsapeMenuItem>
              </Link>
            ))}
            <StyledCollsapeMenuItem onClick={handleSignOut}>
              <SignoutIcon />
              <span>Sign Out</span>
            </StyledCollsapeMenuItem>
          </StyledCollapseMenu>
        ) : null}
        <StyledPanelBar>
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
          <StyledPanelButton onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon />
          </StyledPanelButton>
        </StyledPanelBar>
      </StyledPanel>
    </StyledPanelWrapper>
  );
}
