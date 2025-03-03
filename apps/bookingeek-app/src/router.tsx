import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuth } from "./common/hooks/useAuth";
import BusinessPanelPage from "./businesses/pages/panel";
import BusinessShowcasePage from "./businesses/pages/showcase";
import ResourcesListView from "./businesses/views/resources-list";
import BusinessInfoView from "./businesses/views/business";
import UsersManagementView from "./businesses/views/users";
import AccountManagementView from "./businesses/views/account";
import NotFoundPage from "./common/pages/not-found";
import BusinessReservationDetailsView from "./businesses/views/business-reservation-details";
import SignInView from "./common/pages/sign-in";
import SignUpView from "./common/pages/sign-up";
import ResourceMenuView from "./resources/views/resource-menu";
import ResourceAvailabilityView from "./resources/views/resource-availability";
import ResourceBasicInfoView from "./resources/views/resource-basic-info";
import ResourceCustomPricesView from "./resources/views/resource-custom-prices";
import ResourceExtraDataFieldsView from "./resources/views/resource-extra-data-fields";
import ResourceUnavailabilityView from "./resources/views/resource-unavailability";
import ResourceScheduleTypeView from "./resources/views/resource-schedule-type";
import ResourceProvider from "./resources/components/resource-provider/resource-provider";
import ReservationDetailsPage from "./reservations/pages/reservation";
import ReservationProvider from "./reservations/components/reservation-provider";
import ReservationsListView from "./businesses/views/reservations-list";

const PublicRouter = () => (
  <Routes>
    <Route path="/business">
      <Route index element={<Navigate to="/" />} />
      <Route path=":businessId" element={<BusinessShowcasePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
    <Route
      path="/reservation/:reservationId"
      element={<ReservationDetailsPage />}
    />
    <Route path="signup" element={<SignUpView />} />
    <Route path="/" element={<SignInView />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const ProtectedRouter = () => (
  <Routes>
    <Route element={<BusinessPanelPage />}>
      <Route path="/resources" element={<ResourcesListView />} />
      <Route path="/resources/:resourceId" element={<ResourceProvider />}>
        <Route index element={<ResourceMenuView />} />
        <Route path="availability" element={<ResourceAvailabilityView />} />
        <Route path="basic-info" element={<ResourceBasicInfoView />} />
        <Route path="schedule-type" element={<ResourceScheduleTypeView />} />
        <Route path="custom-prices" element={<ResourceCustomPricesView />} />
        <Route
          path="extra-data-fields"
          element={<ResourceExtraDataFieldsView />}
        />
        <Route path="unavailability" element={<ResourceUnavailabilityView />} />
      </Route>
      <Route path="/reservations" element={<ReservationsListView />} />
      <Route
        path="/reservations/:reservationId"
        element={<ReservationProvider />}
      >
        <Route index element={<BusinessReservationDetailsView />} />
      </Route>

      <Route path="/users" element={<UsersManagementView />} />
      <Route path="/account" element={<AccountManagementView />} />
      <Route path="/business" element={<BusinessInfoView />} />
      <Route path="*" element={<Navigate to="/resources" />} />
    </Route>
  </Routes>
);

export default function Router() {
  const { accessToken } = useAuth();

  return (
    <BrowserRouter>
      {accessToken ? (
        <ProtectedRouter></ProtectedRouter>
      ) : (
        <PublicRouter></PublicRouter>
      )}
    </BrowserRouter>
  );
}
