import { Outlet, useNavigate } from "react-router";
import PanelLateralNavigationMenu from "../components/common/panel-lateral-navigation-menu";
import styled from "styled-components";
import { useActiveView } from "../hooks/useActiveView";
import PanelMobileNavigationMenu from "../components/common/panel-mobile-navigation-menu";
import { useGetResourcesQuery } from "../store/resources-api";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  selectToastNotification,
  toastNotificationCleared,
} from "../store/common-slice";
import Toast from "../components/common/toast";
import { useEffect } from "react";
import { useGetBusinessByIdQuery } from "../store/businesses-api";
import DesktopHeader from "../components/common/desktop-header";
import IconButton from "../components/common/icon-button";
import ViewHeader from "../components/common/view-hedaer";
import BackIcon from "../components/icons/back/back";

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
  const { data: businessResources } = useGetResourcesQuery({
    businessId: user!.businessId,
  });
  const { data: businessData } = useGetBusinessByIdQuery(
    user?.businessId || "null"
  );
  // Dismisses toast after 6 seconds
  useEffect(() => {
    if (toastNotification) {
      setInterval(onToastNotificationDismiss, 6000);
    }
  }, [toastNotification]);

  // Set page title
  useEffect(() => {
    if (businessData) document.title = `${businessData.name} - Bookingeek`;
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

  const everythingLoaded = businessData && businessResources;

  return everythingLoaded ? (
    <>
      <DesktopHeader
        businessName={businessData.name}
        businessPictureUrl={businessData.pictureUrl || "/business-generic.png"}
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
