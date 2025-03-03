import styled from "styled-components";
import Button from "../common/button";
import FormHeader from "../common/form-header";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0px 8px;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const StyledDatEntry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledDataEntryTitle = styled.p`
  font-weight: 500;
`;

type ConfirmationStepProps = {
  customerName: string;
  customerEmail: string;
  extraData: Record<string, string | boolean>;
  checkoutTypeChosen: "in-loco" | "online";
  isCreatingReservation: boolean;
  onNextClick: () => void;
  onBackClick: () => void;
};

export default function ConfirmationStep({
  checkoutTypeChosen,
  customerEmail,
  customerName,
  extraData,
  isCreatingReservation,
  onBackClick,
  onNextClick,
}: ConfirmationStepProps) {
  return (
    <StyledContainer>
      <FormHeader>Your information</FormHeader>
      <StyledDataContainer>
        <StyledDatEntry>
          <StyledDataEntryTitle>Name</StyledDataEntryTitle>
          <p>{customerName}</p>
        </StyledDatEntry>
        <StyledDatEntry>
          <StyledDataEntryTitle>E-mail</StyledDataEntryTitle>
          <p>{customerEmail}</p>
        </StyledDatEntry>
        {Object.entries(extraData).map(([value, key]) => (
          <StyledDatEntry>
            <StyledDataEntryTitle>{key}</StyledDataEntryTitle>
            <p>{typeof value === "string" ? value : value ? "Yes" : "No"}</p>
          </StyledDatEntry>
        ))}
      </StyledDataContainer>
      <StyledButtonsContainer>
        <Button variant="secondary" onClick={onBackClick}>
          Back
        </Button>
        <Button onClick={onNextClick} disabled={isCreatingReservation}>
          {checkoutTypeChosen === "in-loco" ? "Confirm" : "Checkout"}
        </Button>
      </StyledButtonsContainer>
    </StyledContainer>
  );
}
