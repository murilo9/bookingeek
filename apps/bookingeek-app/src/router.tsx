import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuth } from "./common/hooks/useAuth";
import AuthenticationPage from "./common/pages/authentication";
import BusinessPanelPage from "./business/pages/panel";
import BusinessShowcasePage from "./business/pages/showcase";
import ResourcesManagementView from "./business/views/resources";
import ReservationsView from "./business/views/reservations";
import BusinessInfoView from "./business/views/business";
import UsersManagementView from "./business/views/users";
import AccountManagementView from "./business/views/account";
import NotFoundPage from "./common/pages/not-found";

const PublicRouter = () => (
  <Routes>
    <Route path="/business">
      <Route index element={<Navigate to="/" />} />
      <Route path=":businessId" element={<BusinessShowcasePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
    <Route path="/" element={<AuthenticationPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const ProtectedRouter = () => (
  <Routes>
    <Route element={<BusinessPanelPage />}>
      <Route path="/resources" element={<ResourcesManagementView />} />
      <Route path="/reservations" element={<ReservationsView />} />
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
