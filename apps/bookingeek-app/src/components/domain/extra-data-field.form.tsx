import styled from "styled-components";

import {
  RESOURCE_EXTRA_FIELD_OPTIONS,
  ResourceExtraField,
  ResourceExtraFieldType,
} from "@bookingeek/core";
import { useState, useEffect } from "react";
import Button from "../common/button";
import { FormFieldLabel } from "../common/form-field-label";
import IconButton from "../common/icon-button";
import Input from "../common/input";
import Select from "../common/select";
import AddIcon from "../icons/add/add";
import CloseIcon from "../icons/close/close";
import DeleteIcon from "../icons/delete/delete";

const StyledForm = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const StyledFormFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledOptionField = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledEmptyOptionsLabel = styled.p`
  font-style: italic;
  padding-top: 8px;
`;

const StyledAddOptionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
`;

const StyledErrorLabel = styled.p`
  font-size: 14px;
  color: #ff0000;
`;

const FIELD_TYPE_OPTIONS = Object.entries(RESOURCE_EXTRA_FIELD_OPTIONS).map(
  ([label, value]) => ({ label, value })
);

type ExtraDataFieldFormProps = {
  extraField: ResourceExtraField;
  onChange: (value: ResourceExtraField) => void;
  onRemoveClick: () => void;
};

export default function ExtraDataFieldForm({
  extraField,
  onRemoveClick,
  onChange,
}: ExtraDataFieldFormProps) {
  const [fieldTitle, setFieldTitle] = useState(extraField.title);
  const [fieldType, setFieldType] = useState(extraField.type);
  const [fieldOptions, setFieldOptions] = useState(extraField.options || []);

  const fieldTypeIsOptions =
    fieldType === "options-radio" || fieldType === "options-select";

  // Handles the extra data field's options change, if any
  const onFieldOptionChange = (value: string, index: number) => {
    const updatedFieldOptions = [...fieldOptions];
    updatedFieldOptions[index] = value;
    setFieldOptions(updatedFieldOptions);
  };

  // TODO: set options limit depending on the field type
  const onAddFieldOptionClick = () => {
    const updatedFieldOptions = [...fieldOptions];
    updatedFieldOptions.push("New option");
    setFieldOptions(updatedFieldOptions);
  };

  // Removes an option from the extra data field
  const onRemoveOptionClick = (index: number) => {
    const updatedFieldOptions = [...fieldOptions];
    updatedFieldOptions.splice(index, 1);
    setFieldOptions(updatedFieldOptions);
  };

  const afterUpdate = () => {
    onChange({
      title: fieldTitle,
      type: fieldType,
      options: fieldOptions,
    });
  };

  // Triggers the changes every times options change
  useEffect(() => {
    afterUpdate();
  }, [fieldOptions, fieldTitle, fieldType]);

  return (
    <StyledForm>
      <StyledFormFieldsContainer>
        <StyledFormField>
          <FormFieldLabel>Title</FormFieldLabel>
          <Input
            value={fieldTitle}
            onChange={({ target: { value } }) => setFieldTitle(value)}
            error={!fieldTitle.trim()}
            fullwidth
          />
        </StyledFormField>
        {!fieldTitle.trim() ? (
          <StyledErrorLabel>Field must have a title</StyledErrorLabel>
        ) : null}
        <StyledFormField>
          <FormFieldLabel>Type</FormFieldLabel>
          <Select
            value={fieldType}
            onChange={({ target: { value } }) =>
              setFieldType(value as ResourceExtraFieldType)
            }
          >
            {FIELD_TYPE_OPTIONS.map(({ value, label }) => (
              <option value={value}>{label}</option>
            ))}
          </Select>
        </StyledFormField>
        {fieldTypeIsOptions ? (
          <StyledFormField>
            <FormFieldLabel>Options</FormFieldLabel>
            {fieldOptions.length ? (
              fieldOptions.map((fieldOption, index) => (
                <StyledOptionsList key={index}>
                  <StyledOptionField>
                    <Input
                      value={fieldOption}
                      onChange={({ target: { value } }) =>
                        onFieldOptionChange(value, index)
                      }
                      fullwidth
                    />
                    <IconButton onClick={() => onRemoveOptionClick(index)}>
                      <CloseIcon color="#ff0000" />
                    </IconButton>
                  </StyledOptionField>
                </StyledOptionsList>
              ))
            ) : (
              <StyledEmptyOptionsLabel>No options yet</StyledEmptyOptionsLabel>
            )}
            <StyledAddOptionButtonContainer>
              <Button
                variant="secondary"
                onClick={onAddFieldOptionClick}
                startSlot={<AddIcon size={20} />}
              >
                Add Option
              </Button>
            </StyledAddOptionButtonContainer>
          </StyledFormField>
        ) : null}
      </StyledFormFieldsContainer>
      <IconButton onClick={onRemoveClick}>
        <DeleteIcon color="#ff0000" />
      </IconButton>
    </StyledForm>
  );
}
