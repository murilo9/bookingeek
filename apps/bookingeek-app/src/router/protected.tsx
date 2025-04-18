import { Routes, Route, Navigate } from "react-router";
import ReservationProvider from "../components/domain/reservation-provider";
import ResourceProvider from "../components/domain/resource-provider";
import BusinessPanelPage from "../pages/panel";
import AccountManagementView from "../views/account";
import BusinessInfoView from "../views/business-info";
import BusinessReservationDetailsView from "../views/business-reservation-details";
import ReservationsListView from "../views/reservations-list";
import ResourceAvailabilityView from "../views/resource-availability";
import ResourceBasicInfoView from "../views/resource-basic-info";
import ResourceExtraDataFieldsView from "../views/resource-extra-data-fields";
import ResourceMenuView from "../views/resource-menu";
import ResourceScheduleTypeView from "../views/resource-schedule-type";
import ResourceUnavailabilityView from "../views/resource-unavailability";
import ResourcesListView from "../views/resources-list";
import UsersManagementView from "../views/users";
import CreateResourceView from "../views/create-resource";
import ReservationDetailsPage from "../pages/reservation";
import BusinessShowcasePage from "../pages/showcase";

export default function ProtectedRouter() {
  return (
    <Routes>
      <Route element={<BusinessPanelPage />}>
        <Route path="/resources" element={<ResourcesListView />} />
        <Route path="/resources/:resourceId" element={<ResourceProvider />}>
          <Route index element={<ResourceMenuView />} />
          <Route path="availability" element={<ResourceAvailabilityView />} />
          <Route path="basic-info" element={<ResourceBasicInfoView />} />
          <Route path="schedule-type" element={<ResourceScheduleTypeView />} />
          {/* <Route path="custom-prices" element={<ResourceCustomPricesView />} /> */}
          <Route
            path="extra-data-fields"
            element={<ResourceExtraDataFieldsView />}
          />
          <Route
            path="unavailability"
            element={<ResourceUnavailabilityView />}
          />
        </Route>
        <Route path="/new-resource" element={<CreateResourceView />} />
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
      {/* FROM PUBLIC ROUTER */}
      <Route path="/b">
        <Route index element={<Navigate to="/" />} />
        <Route path=":businessIdOrSlug" element={<BusinessShowcasePage />}>
          <Route path=":resourceIdOrSlug" element={<BusinessShowcasePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
      <Route
        path="/reservation/:reservationId"
        element={<ReservationDetailsPage />}
      />
    </Routes>
  );
}
