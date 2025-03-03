import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuth } from "./hooks/useAuth";
import BusinessPanelPage from "./pages/panel";
import BusinessShowcasePage from "./pages/showcase";
import ResourcesListView from "./views/resources-list";
import BusinessInfoView from "./views/business";
import UsersManagementView from "./views/users";
import AccountManagementView from "./views/account";
import NotFoundPage from "./pages/not-found";
import BusinessReservationDetailsView from "./views/business-reservation-details";
import SignInView from "./pages/sign-in";
import SignUpView from "./pages/sign-up";
import ResourceMenuView from "./views/resource-menu";
import ResourceAvailabilityView from "./views/resource-availability";
import ResourceBasicInfoView from "./views/resource-basic-info";
import ResourceCustomPricesView from "./views/resource-custom-prices";
import ResourceExtraDataFieldsView from "./views/resource-extra-data-fields";
import ResourceUnavailabilityView from "./views/resource-unavailability";
import ResourceScheduleTypeView from "./views/resource-schedule-type";
import ResourceProvider from "./components/domain/resource-provider";
import ReservationDetailsPage from "./pages/reservation";
import ReservationProvider from "./components/domain/reservation-provider";
import ReservationsListView from "./views/reservations-list";

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
