import { useOutletContext } from "react-router";
import styled from "styled-components";
import { useHandleRequestCall } from "../../common/hooks/handle-request-call";
import { useUpdateResourceMutation } from "../resources-api";
import ExtraDataFieldForm from "../components/extra-data-field-form/extra-data-field.form";
import Button from "../../common/components/button/button";
import AddIcon from "../../common/icons/add/add";
import { useState } from "react";
import { useFormComparator } from "../../common/hooks/useFormComparator";
import {
  Resource,
  ResourceExtraField,
  UpdateResourcePayload,
} from "@bookingeek/core";

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

export default function ResourceExtraDataFieldsView() {
  const resource = useOutletContext<Resource<string>>();
  const handleRequestCall = useHandleRequestCall();
  const [extraFields, setExtraFields] = useState(resource.extraFields);
  const [updateResource, updateData] = useUpdateResourceMutation();
  const { formChanged } = useFormComparator({
    extraFields,
  });
  const isSaving = updateData.isLoading;

  // Adds an extra data field
  // TODO: set field amount limit
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
    const dto: UpdateResourcePayload = {
      ...resource,
      extraFields,
    };
    const requestCall = await updateResource({ dto, id: resource._id });
    handleRequestCall(requestCall, "Changes saved successfully.");
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
        >
          Add Field
        </Button>
        <Button disabled={!formChanged || isSaving} onClick={onSaveClick}>
          Save Changes
        </Button>
      </StyledButtonsContainer>
    </StyledForm>
  );
}
