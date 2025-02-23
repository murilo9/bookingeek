import {
  Resource,
  ResourceExtraField,
} from "@bookingeek/api/src/resources/types";
import styled from "styled-components";
import FormHeader from "../../common/components/form-header/form-header";
import FormField, {
  FormFieldType,
} from "../../common/components/form-field/form-field";
import Checkbox from "../../common/components/checkbox/checkbox";
import { useMemo, useState } from "react";
import Button from "../../common/components/button/button";
import { emailIsValid } from "../../common/helpers/email-is-valid";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledCheckBoxField = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

type ExtraDataStepProps = {
  customerName: string;
  setCustomerName: (name: string) => void;
  customerEmail: string;
  setCustomerEmail: (email: string) => void;
  extraFields: Array<ResourceExtraField>;
  extraDataForm: Record<string, string | boolean>;
  setExtraDataForm: (extraFieldsForm: Record<string, string | boolean>) => void;
  onNextClick: () => void;
  onBackClick: () => void;
};

export default function ExtraDataStep({
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  extraFields,
  onNextClick,
  extraDataForm,
  setExtraDataForm,
}: ExtraDataStepProps) {
  const [emailError, setEmailError] = useState("");
  const customerEmailIsValid = emailIsValid(customerEmail);
  const allExtraFieldsAreFilled = extraFields.reduce(
    (acc, extraField) => acc && Boolean(extraDataForm[extraField.title]),
    true
  );
  const canGoToNextStep =
    Boolean(customerName.trim()) &&
    Boolean(customerEmail.trim()) &&
    customerEmailIsValid &&
    allExtraFieldsAreFilled;

  const onEmailInputBlur = () => {
    setEmailError(
      customerEmailIsValid
        ? ""
        : customerEmail.trim()
          ? "E-mail is invalid"
          : ""
    );
  };

  return (
    <StyledContainer>
      <FormHeader>Your information</FormHeader>
      <FormField
        label="Name"
        value={customerName}
        onChange={setCustomerName}
        autofocus
      />
      <FormField
        label="E-mail"
        error={Boolean(emailError)}
        helperText={emailError}
        value={customerEmail}
        onChange={setCustomerEmail}
        onBlur={onEmailInputBlur}
      />
      {extraFields.map((extraField) =>
        extraField.type === "checkbox" ? (
          <StyledCheckBoxField>
            <Checkbox
              checked={Boolean(extraDataForm[extraField.title])}
              onChange={(checked) =>
                setExtraDataForm({
                  ...extraDataForm,
                  [extraField.title]: checked,
                })
              }
            />
            <p>{extraField.title}</p>
          </StyledCheckBoxField>
        ) : (
          <FormField
            label={extraField.title}
            type={extraField.type as FormFieldType}
            value={extraDataForm[extraField.title]}
            options={extraField.options?.map((option) => ({
              value: option,
              label: option,
            }))}
            onChange={(value) =>
              setExtraDataForm({
                ...extraDataForm,
                [extraField.title]: value,
              })
            }
          />
        )
      )}
      <StyledButtonsContainer>
        <Button variant="secondary">Back</Button>
        <Button disabled={!canGoToNextStep} onClick={() => onNextClick()}>
          Next
        </Button>
      </StyledButtonsContainer>
    </StyledContainer>
  );
}
