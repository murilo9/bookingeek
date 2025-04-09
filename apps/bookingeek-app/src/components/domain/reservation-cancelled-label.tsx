import { Reservation } from "@bookingeek/core";
import styled from "styled-components";
import { formatPriceInCents } from "../../helpers/format-price-in-cents";

const StyledCancellationLabelTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #b80101;
`;

const StyledCancellationLabelSubtitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #b80101;
`;

type ReservationCancellationLabelProps = {
  reservation: Reservation<string>;
};

export default function ReservationCancellationLabel({
  reservation,
}: ReservationCancellationLabelProps) {
  const { totalPriceInCents, refundedAmountInCents } = reservation;

  return reservation.cancelledBy ? (
    <div>
      <StyledCancellationLabelTitle>
        {reservation.cancelledBy === "customer"
          ? "Cancelled by customer"
          : "Cancelled by us"}
      </StyledCancellationLabelTitle>
      <StyledCancellationLabelSubtitle>
        {refundedAmountInCents
          ? `Refunded $ ${formatPriceInCents(refundedAmountInCents)} / ${formatPriceInCents(totalPriceInCents)}`
          : "Not refunded"}
      </StyledCancellationLabelSubtitle>
    </div>
  ) : null;
}
