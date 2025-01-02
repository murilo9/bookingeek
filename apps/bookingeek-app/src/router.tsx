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
import ResourceMenuView from "./businesses/views/resource-menu";

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
