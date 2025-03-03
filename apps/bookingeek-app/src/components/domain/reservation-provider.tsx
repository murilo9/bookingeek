import { Outlet, useParams } from "react-router";
import { useGetReservationsQuery } from "../../store/reservations-api";
import { useAuth } from "../../hooks/useAuth";

/**
 * Loads the resource from URL id param. Passes it by context to the reservation details view.
 */
export default function ReservationProvider() {
  const { reservationId } = useParams();
  const { user } = useAuth();
  if (!user) {
    throw new Error("ReservationProvider: could not retrieve value of user!");
  }

  const { isLoading, isFetching, data } = useGetReservationsQuery({
    _id: reservationId,
  });
  const reservation = data?.find(
    (reservationItem) => reservationItem._id === reservationId
  );

  if (reservationId && (isLoading || isFetching)) {
    return "Loading...";
  }
  if (!reservation) {
    return "Reservation not found";
  }
  return <Outlet context={reservation} />;
}
