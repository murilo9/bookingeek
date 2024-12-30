import styled from "styled-components";
import Input from "../input/input";
import { FormEventHandler } from "react";

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledFormFieldLabel = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

type FormFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: "text" | "password";
  onChange: FormEventHandler;
};

export default function FormField({
  label,
  onChange,
  placeholder,
  value,
  type,
}: FormFieldProps) {
  return (
    <StyledFormField>
      <StyledFormFieldLabel>{label}</StyledFormFieldLabel>
      <Input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
      />
    </StyledFormField>
  );
}
