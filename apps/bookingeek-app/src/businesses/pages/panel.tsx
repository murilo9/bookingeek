import { Outlet, useNavigate } from "react-router";
import ViewHeader from "../../common/components/view-header/view-hedaer";
import IconButton from "../../common/components/icon-button/icon-button";
import BackIcon from "../../common/icons/back/back";
import PanelLateralNavigationMenu from "../../common/components/panel-lateral-navigation-menu/panel-lateral-navigation-menu";
import styled from "styled-components";
import { useActiveView } from "../../common/hooks/useActiveView";
import PanelMobileNavigationMenu from "../../common/components/panel-mobile-navigation-menu/panel-mobile-navigation-menu";
import DesktopHeader from "../../common/components/desktop-header/desktop-header";

const StyledContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media screen and (min-width: 1024px) {
    width: 100%;
    flex-direction: row;
    max-width: 1440px;
    margin: auto;
  }
`;

const StyledViewWrapper = styled.div`
  flex: 1;
  padding: 0px 16px 16px 16px;
  margin-bottom: 16px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default function BusinessPanelPage() {
  // TODO:
  // 1. Display loading view while loading all data to the store
  // 2. Once all data is loaded successfully, render Outlet
  // 3. If an error occurs while loading data, renders error view passing the code error (maybe in the query string?)
  const navigate = useNavigate();
  const activeView = useActiveView();
  const currentPath = window.location.pathname;

  // Goes back in the views hierarchy (removes last part of current URL path)
  const onGoBackClick = () => {
    const pathList = currentPath.split("/");
    const newPath = pathList.slice(0, pathList.length - 1).join("/");
    navigate(newPath);
  };

  const actionButton =
    location.pathname.split("/").length > 2 ? (
      <IconButton onClick={onGoBackClick}>
        <BackIcon size={20} />
      </IconButton>
    ) : (
      <></>
    );

  return (
    <>
      <DesktopHeader
        businessName="Joe's Barber"
        businessPictureUrl="https://jjsbasicmechanic.sitehenger.com/jjs-logo.png"
      />
      <StyledContentWrapper>
        <PanelLateralNavigationMenu />
        <StyledViewWrapper>
          <ViewHeader
            viewTitle={activeView.params[0] || activeView.title}
            startSlot={actionButton}
          />
          <Outlet />
        </StyledViewWrapper>
        <PanelMobileNavigationMenu />
      </StyledContentWrapper>
    </>
  );
}
