import styled from "styled-components";
import { Link } from "react-router";

import { useAuth } from "../../hooks/useAuth";
import InfoOutlinedIcon from "../icons/info-outlined/info-outlined";
import InfoIcon from "../icons/info/info";
import KeyOutlinedIcon from "../icons/key-outlined/key-outlined";
import KeyIcon from "../icons/key/key";
import ReservationOutlinedIcon from "../icons/reservation-outlined/reservation-outlined";
import ReservationIcon from "../icons/reservations/reservation";
import ResourcesOutlinedIcon from "../icons/resources-outlined/resources-outlined";
import ResourcesIcon from "../icons/resources/resources";
import SignoutIcon from "../icons/signout/signout";
import UsersOutlinedIcon from "../icons/users-outlined/users-outlined";
import UsersIcon from "../icons/users/users";
import { googleLogout } from "@react-oauth/google";

const StyledPanel = styled.div`
  display: none;
  width: 240px;
  flex-direction: column;
  gap: 8px;
  padding: 24px 8px;

  @media screen and (min-width: 1024px) {
    display: flex;
  }
`;

const StyledMenuItem = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0px 16px;
  gap: 16px;
  color: #222222;
  font-weight: 500;
  border-radius: 24px;
  cursor: pointer;

  &:hover {
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

export default function PanelLateralNavigationMenu() {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    // TODO: this might need a check for existing google signin
    googleLogout();
    signOut();
    window.location.href = "/";
  };

  return (
    <StyledPanel>
      {MENU_ITEMS.map((item) => (
        <Link to={item.href} key={item.title}>
          <StyledMenuItem>
            {item.icon}
            {item.title}
          </StyledMenuItem>
        </Link>
      ))}
      <StyledMenuItem onClick={handleSignOut}>
        <SignoutIcon />
        <span>Sign Out</span>
      </StyledMenuItem>
    </StyledPanel>
  );
}
