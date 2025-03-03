import styled from "styled-components";
import Input from "../../common/components/input/input";
import ReservationItem from "../../reservations/components/reservation-item";
import { useGetReservationsQuery } from "../../reservations/reservations-api";

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
              <ReservationItem reservation={reservation} clickable />
            ))}
      </StyledReservationItemsList>
    </StyledReservationsView>
  );
}
