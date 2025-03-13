import { Routes, Route, Navigate } from "react-router";
import NotFoundPage from "../pages/not-found";
import ReservationDetailsPage from "../pages/reservation";
import BusinessShowcasePage from "../pages/showcase";
import SignUpPage from "../pages/sign-up";
import SignInPage from "../pages/sign-in";

export default function PublicRouter() {
  return (
    <Routes>
      <Route path="/business">
        <Route index element={<Navigate to="/" />} />
        <Route path=":businessId" element={<BusinessShowcasePage />}>
          <Route path=":resourceId" element={<BusinessShowcasePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
      <Route
        path="/reservation/:reservationId"
        element={<ReservationDetailsPage />}
      />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="/" element={<SignInPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
