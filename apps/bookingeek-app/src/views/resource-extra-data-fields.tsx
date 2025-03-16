import { useOutletContext } from "react-router";
import styled from "styled-components";
import { useHandleRequestCall } from "../hooks/handle-request-call";
import { useUpdateResourceMutation } from "../store/resources-api";
import ExtraDataFieldForm from "../components/domain/extra-data-field.form";
import { useState } from "react";
import { useFormComparator } from "../hooks/useFormComparator";
import {
  Resource,
  ResourceExtraField,
  UpdateResourcePayload,
} from "@bookingeek/core";
import Button from "../components/common/button";
import AddIcon from "../components/icons/add/add";
const FILEDS_LIMIT = 8;

const StyledForm = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 640px;
`;

const StyledEmptyFieldsLabel = styled.p`
  font-style: italic;
  padding: 16px 0;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledDivider = styled.div`
  border-bottom: 1px solid #cccccc;
  width: 100%;
`;

// Checks if a field is invalid
const getInvalidFields = (field: ResourceExtraField) => {
  const hasName = Boolean(field.title.trim());
  const hasOptions = field.type.includes("options")
    ? field.options?.length !== 0
    : true;
  return !hasName || !hasOptions;
};

export default function ResourceExtraDataFieldsView() {
  const resource = useOutletContext<Resource<string>>();
  const handleRequestCall = useHandleRequestCall();
  const [extraFields, setExtraFields] = useState(resource.extraFields);
  const [updateResource, updateData] = useUpdateResourceMutation();
  const { formChanged } = useFormComparator({
    extraFields,
  });
  const isSaving = updateData.isLoading;
  const reachedLimit = extraFields.length === FILEDS_LIMIT;
  const hasInvalidFields = extraFields.filter(getInvalidFields).length > 0;

  const maySaveChanges =
    formChanged && !isSaving && !reachedLimit && !hasInvalidFields;

  // Adds an extra data field
  const onAddExtraFieldClick = () => {
    const updatedExtraFields = [...extraFields];
    updatedExtraFields.push({ title: "New field", type: "text" });
    setExtraFields(updatedExtraFields);
  };

  const onRemoveExtraFieldClick = (index: number) => {
    const updatedExtraFields = [...extraFields];
    updatedExtraFields.splice(index, 1);
    setExtraFields(updatedExtraFields);
  };

  const onSaveClick = async () => {
    if (maySaveChanges) {
      const dto: UpdateResourcePayload = {
        ...resource,
        extraFields,
      };
      const requestCall = await updateResource({ dto, id: resource._id });
      handleRequestCall(requestCall, "Changes saved successfully.");
    }
  };

  const onExtraFieldUpdate = (
    extraField: ResourceExtraField,
    index: number
  ) => {
    const updatedExtraFields = [...extraFields];
    updatedExtraFields.splice(index, 1, extraField);
    setExtraFields(updatedExtraFields);
  };

  return (
    <StyledForm>
      {extraFields.length ? (
        extraFields.map((extraField, index) => (
          <>
            {index ? <StyledDivider /> : null}
            <ExtraDataFieldForm
              extraField={extraField}
              onRemoveClick={() => onRemoveExtraFieldClick(index)}
              onChange={(value) => onExtraFieldUpdate(value, index)}
            />
          </>
        ))
      ) : (
        <StyledEmptyFieldsLabel>No extra fields set.</StyledEmptyFieldsLabel>
      )}
      <StyledButtonsContainer>
        <Button
          variant="secondary"
          onClick={onAddExtraFieldClick}
          startSlot={<AddIcon size={20} />}
          disabled={reachedLimit}
        >
          Add Field
        </Button>
        <Button disabled={!maySaveChanges} onClick={onSaveClick}>
          Save Changes
        </Button>
      </StyledButtonsContainer>
    </StyledForm>
  );
}
