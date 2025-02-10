import { Outlet, useNavigate } from "react-router";
import ViewHeader from "../../common/components/view-header/view-hedaer";
import IconButton from "../../common/components/icon-button/icon-button";
import BackIcon from "../../common/icons/back/back";
import PanelLateralNavigationMenu from "../../common/components/panel-lateral-navigation-menu/panel-lateral-navigation-menu";
import styled from "styled-components";
import { useActiveView } from "../../common/hooks/useActiveView";
import PanelMobileNavigationMenu from "../../common/components/panel-mobile-navigation-menu/panel-mobile-navigation-menu";
import DesktopHeader from "../../common/components/desktop-header/desktop-header";
import { useGetResourcesQuery } from "../../resources/resources-api";
import { useAuth } from "../../common/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectToastNotification,
  toastNotificationCleared,
} from "../../common/common-slice";
import Toast from "../../common/components/toast/toast";
import { useEffect } from "react";
import { useGetBusinessByIdQuery } from "../businesses-api";

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
  const dispatch = useAppDispatch();
  const toastNotification = useAppSelector(selectToastNotification);
  const navigate = useNavigate();
  const activeView = useActiveView();
  const currentPath = window.location.pathname;
  const { user } = useAuth();
  const resourcesLoaded = useGetResourcesQuery(user!.businessId).data;
  const businessData = useGetBusinessByIdQuery(user?.businessId || "null");

  // Dismisses toast after 6 seconds
  useEffect(() => {
    if (toastNotification) {
      setInterval(onToastNotificationDismiss, 6000);
    }
  }, [toastNotification]);

  // Set page title
  useEffect(() => {
    if (businessData?.data)
      document.title = `${businessData.data.name} - Bookingeek`;
  }, [businessData]);

  // Goes back in the views hierarchy (removes last part of current URL path)
  const onGoBackClick = () => {
    const pathList = currentPath.split("/");
    const newPath = pathList.slice(0, pathList.length - 1).join("/");
    navigate(newPath);
  };

  // Dismisses the toast notification
  const onToastNotificationDismiss = () => {
    dispatch(toastNotificationCleared());
  };

  // Action button of view header
  const actionButton =
    location.pathname.split("/").length > 2 ? (
      <IconButton onClick={onGoBackClick}>
        <BackIcon size={20} />
      </IconButton>
    ) : (
      <></>
    );

  return resourcesLoaded ? (
    <>
      <DesktopHeader
        businessName="Joe's Barber"
        businessPictureUrl="https://jjsbasicmechanic.sitehenger.com/jjs-logo.png"
      />
      <StyledContentWrapper>
        <PanelLateralNavigationMenu />
        <StyledViewWrapper>
          <ViewHeader
            viewTitle={
              activeView.selectedResource?.title ||
              activeView.params[0] ||
              activeView.title
            }
            startSlot={actionButton}
          />
          <Outlet />
        </StyledViewWrapper>
        <PanelMobileNavigationMenu />
      </StyledContentWrapper>
      {toastNotification ? (
        <Toast
          message={toastNotification.message}
          type={toastNotification.type}
          onClose={onToastNotificationDismiss}
        />
      ) : null}
    </>
  ) : (
    // TODO: add skeleton loader
    "Loading..."
  );
}
