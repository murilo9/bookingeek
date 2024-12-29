import { Outlet, useLocation, useNavigate } from "react-router";
import PanelHeader from "../../common/components/panel-header/panel-hedaer";
import IconButton from "../../common/components/icon-button/icon-button";
import { useMemo } from "react";
import BackIcon from "../../common/icons/back";

const VIEWS: Record<string, string> = {
  resources: "Resources",
  reservations: "Reservations",
  business: "Business",
  account: "Account",
  users: "Users",
};

export default function BusinessPanelPage() {
  // TODO:
  // 1. Display loading view while loading all data to the store
  // 2. Once all data is loaded successfully, render Outlet
  // 3. If an error occurs while loading data, renders error view passing the code error (maybe in the query string?)
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const viewTitle = VIEWS[route];

  // Goes back in the views hierarchy
  const onGoBackClick = () => {
    navigate(`/${route}`);
  };

  const actionButton = useMemo(() => {
    return location.pathname.split("/").length > 2 ? (
      <IconButton onClick={onGoBackClick}>
        <BackIcon size={20} />
      </IconButton>
    ) : (
      <></>
    );
  }, [location]);

  return (
    <>
      <PanelHeader
        viewTitle={viewTitle}
        startSlot={actionButton}
        businessName="Joe's Barber"
        businessPictureUrl="https://jjsbasicmechanic.sitehenger.com/jjs-logo.png"
      />

      <p>--- outlet start ---</p>
      <Outlet />
      <p>--- outlet end ---</p>
    </>
  );
}
