import styled from "styled-components";
import Input from "../input/input";
import Select from "../select/select";
import Textarea from "../textarea/textarea";
import { FormFieldLabel } from "./form-field-label";
import { KeyboardEvent } from "react";
import RadioEmptyIcon from "../../icons/radio-empty/radio-empty";
import RadioFullIcon from "../../icons/radio-full/radio-full";

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledRadioInputContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledRadioInput = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  svg {
    cursor: pointer;
  }
`;

const StyledFormFieldDescription = styled.p`
  font-size: 14px;
  color: #666666;
  margin-top: 4px;
`;

const StyledFormFieldHelper = styled.p<{ error?: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.error ? "#ff0000" : "#666666")};
  margin-top: 8px;
  margin-left: 8px;
`;

const StyledFormFieldLabel = styled(FormFieldLabel)`
  font-weight: 600;
`;

const StyledFormFieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
`;

type FormFieldProps<ValueType = string, InputValueType = string> = {
  // Text displayed above the input
  label: string;
  // Field value
  value: ValueType;
  // Only applies for 'select-value' field type
  inputValue?: InputValueType;
  // Description displayed between the labe and the input
  description?: string;
  // Input placeholder
  placeholder?: string;
  // Input type
  type?: "text" | "textarea" | "password" | "select" | "radio" | "select-value";
  // Only applies when type = 'select' or 'radio'
  options?: Array<{ value: string; label: string }>;
  // Children that will be rendered bellow the content
  children?: JSX.Element | Array<JSX.Element> | string | null;
  // Used to draw icons or button inside the input. Only applies when type != 'radio'
  inputStartSlot?: JSX.Element;
  // A helper text displayed bellow the input
  helperText?: string;
  // Whether the input should autofocus. Only applies to text-based inputs
  autofocus?: boolean;
  // Makes the input outline and helper text red.
  error?: boolean;
  // Change handler
  onChange: (value: ValueType) => void;
  // Inpout value change handler. Only applies for 'select-value' field type
  onInputValueChange?: (value: InputValueType) => void;
  // Called when user presses Enter key. Only applies if type != 'radio'
  onSubmit?: () => void;
};

/**
 * Renders a form field with label, input (text, select, radio, etc).
 */
export default function FormField<ValueType = string, InputValueType = string>({
  label,
  onChange,
  onSubmit,
  onInputValueChange,
  error,
  placeholder,
  value,
  inputValue,
  type,
  options,
  helperText,
  autofocus,
  children,
  description,
}: FormFieldProps<ValueType, InputValueType>) {
  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onSubmit) {
      onSubmit();
    }
  };

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <Select error={error}>
            {(options || []).map((option) => (
              <option value={option.value} key={value as string}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      case "select-value":
        return (
          <StyledFormFieldGrid>
            <Input
              onChange={({ target: { value } }) =>
                onInputValueChange
                  ? onInputValueChange(value as InputValueType)
                  : null
              }
              onKeyUp={handleKeyUp}
              value={inputValue as string}
              placeholder={placeholder}
              autoFocus={autofocus}
              type={type || "text"}
              error={error}
            />
            <Select error={error}>
              {(options || []).map((option) => (
                <option value={option.value} key={value as string}>
                  {option.label}
                </option>
              ))}
            </Select>
          </StyledFormFieldGrid>
        );
      case "radio":
        return (
          <StyledRadioInputContainer>
            {options?.length
              ? options.map((option) => (
                  <StyledRadioInput
                    onClick={() => onChange(option.value as ValueType)}
                    key={option.value}
                  >
                    {value === option.value ? (
                      <RadioFullIcon size={20} />
                    ) : (
                      <RadioEmptyIcon size={20} />
                    )}
                    <span>{option.label}</span>
                  </StyledRadioInput>
                ))
              : null}
          </StyledRadioInputContainer>
        );
      case "textarea":
        return (
          <Textarea
            onChange={({ target: { value } }) => onChange(value as ValueType)}
            value={value as string}
            placeholder={placeholder}
            autoFocus={autofocus}
          />
        );
      case "text":
      case "password":
      default:
        return (
          <Input
            onChange={({ target: { value } }) => onChange(value as ValueType)}
            onKeyUp={handleKeyUp}
            value={value as string}
            placeholder={placeholder}
            autoFocus={autofocus}
            type={type || "text"}
            error={error}
          />
        );
    }
  };

  return (
    <StyledFormField
      onSubmit={(event) => {
        console.log(event);
        event.preventDefault();
      }}
    >
      <div>
        <StyledFormFieldLabel>{label}</StyledFormFieldLabel>
        {description ? (
          <StyledFormFieldDescription>{description}</StyledFormFieldDescription>
        ) : null}
      </div>
      {/* TODO: input start slots */}
      <div>
        {renderInput()}
        {helperText ? (
          <StyledFormFieldHelper error={error}>
            {helperText}
          </StyledFormFieldHelper>
        ) : null}
        {children}
      </div>
    </StyledFormField>
  );
}
