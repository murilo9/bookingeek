import styled from "styled-components";
import Button from "../common/button";
import FormHeader from "../common/form-header";
import OptionButton from "../common/option-button";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledOptionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

type PaymentTypeStep = {
  value: "in-loco" | "online" | null;
  onChange: (value: "in-loco" | "online") => void;
  onNextClick: () => void;
  onBackClick: () => void;
};

export default function PaymentTypeStep({
  onChange,
  onNextClick,
  onBackClick,
  value,
}: PaymentTypeStep) {
  const canGoToNextStep = value !== null;

  return (
    <StyledContainer>
      <FormHeader>Choose how to pay</FormHeader>
      <StyledOptionButtonsContainer>
        <OptionButton
          selected={value === "in-loco"}
          onClick={() => onChange("in-loco")}
        >
          In-loco
        </OptionButton>
        <OptionButton
          selected={value == "online"}
          onClick={() => onChange("online")}
        >
          Online
        </OptionButton>
      </StyledOptionButtonsContainer>
      <StyledButtonsContainer>
        <Button variant="secondary" onClick={onBackClick}>
          Back
        </Button>
        <Button disabled={!canGoToNextStep} onClick={onNextClick}>
          Next
        </Button>
      </StyledButtonsContainer>
    </StyledContainer>
  );
}
