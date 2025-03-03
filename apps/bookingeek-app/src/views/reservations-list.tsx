import styled from "styled-components";
import ReservationItem from "../components/domain/reservation-item";
import { useGetReservationsQuery } from "../store/reservations-api";
import Input from "../components/common/input";
import { useNavigate } from "react-router";

const StyledReservationsView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledReservationItemsList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 8px;
  @media screen and (min-width: 768px) {
    padding: 0px;
  }
`;

export default function ReservationsListView() {
  const { data: reservations, isLoading } = useGetReservationsQuery({});
  const navigate = useNavigate();

  return (
    <StyledReservationsView>
      <StyledHeader>
        <Input placeholder="Search" />
        {/* TODO: add fitler button */}
      </StyledHeader>
      <StyledReservationItemsList>
        {isLoading
          ? "Loading reservations..."
          : reservations?.map((reservation) => (
              <ReservationItem
                reservation={reservation}
                clickable
                onClick={() => navigate("/reservations/" + reservation._id)}
              />
            ))}
      </StyledReservationItemsList>
    </StyledReservationsView>
  );
}
