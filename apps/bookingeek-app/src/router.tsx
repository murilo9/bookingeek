import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuth } from "./common/hooks/useAuth";
import BusinessPanelPage from "./businesses/pages/panel";
import BusinessShowcasePage from "./businesses/pages/showcase";
import ResourcesListView from "./businesses/views/resources-list";
import ReservationsView from "./businesses/views/reservations";
import BusinessInfoView from "./businesses/views/business";
import UsersManagementView from "./businesses/views/users";
import AccountManagementView from "./businesses/views/account";
import NotFoundPage from "./common/pages/not-found";
import ReservationDetailsView from "./businesses/views/reservation-details";
import SignInView from "./common/pages/sign-in";
import SignUpView from "./common/pages/sign-up";
import ResourceMenuView from "./resources/views/resource-menu";
import ResourceAvailabilityView from "./resources/views/resource-availability";
import ResourceBasicInfoView from "./resources/views/resource-basic-info";
import ResourceCustomPricesView from "./resources/views/resource-custom-prices";
import ResourceExtraDataFieldsView from "./resources/views/resource-extra-data-fields";
import ResourceUnavailabilityView from "./resources/views/resource-unavailability";

const PublicRouter = () => (
  <Routes>
    <Route path="/business">
      <Route index element={<Navigate to="/" />} />
      <Route path=":businessId" element={<BusinessShowcasePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
    <Route path="signup" element={<SignUpView />} />
    <Route path="/" element={<SignInView />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const ProtectedRouter = () => (
  <Routes>
    <Route element={<BusinessPanelPage />}>
      <Route path="/resources" element={<ResourcesListView />} />
      <Route path="/resources/:id" element={<ResourceMenuView />} />
      <Route
        path="/resources/:id/availability"
        element={<ResourceAvailabilityView />}
      />
      <Route
        path="/resources/:id/basic-info"
        element={<ResourceBasicInfoView />}
      />
      <Route
        path="/resources/:id/custom-prices"
        element={<ResourceCustomPricesView />}
      />
      <Route
        path="/resources/:id/extra-data-fields"
        element={<ResourceExtraDataFieldsView />}
      />
      <Route
        path="/resources/:id/unavailability"
        element={<ResourceUnavailabilityView />}
      />
      <Route path="/reservations" element={<ReservationsView />}>
        <Route path=":id" element={<ReservationDetailsView />} />
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
