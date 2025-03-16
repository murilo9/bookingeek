import styled from "styled-components";
import { FormFieldLabel } from "../components/common/form-field-label";
import Button from "../components/common/button";
import Input from "../components/common/input";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFormComparator } from "../hooks/useFormComparator";
import { useUpdateUserMutation } from "../store/users-api";
import { UpdateUserPayload } from "@bookingeek/core";
import { useAppDispatch } from "../store/store";
import { toastNotificationShown } from "../store/common-slice";
import { useNavigate } from "react-router";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 600px;

  @media screen and (min-width: 768px) {
    align-items: flex-start;
  }
`;

const StyledPlanForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const StyledPlanExpirationLabel = styled.p`
  font-size: 14px;
`;

const StyledPlanOptionsButton = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
`;

export default function AccountManagementView() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [updateUser] = useUpdateUserMutation();
  const [userName, setUserName] = useState("");
  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const userNameChanged = userName !== user?.name;
  const maySaveChanges = userNameChanged && !isSavingChanges;

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user?.name]);

  const onSaveChanges = async () => {
    setIsSavingChanges(true);
    const payload: UpdateUserPayload = {
      name: userName,
    };
    const { data, error } = await updateUser({ payload, id: user!._id });
    if (error) {
      console.log(error);
      dispatch(
        toastNotificationShown({
          message:
            "There was an error while saving your changes. Please try again.",
          type: "error",
        })
      );
    }
    if (data) {
      dispatch(
        toastNotificationShown({
          message: "Changes saved successfully.",
          type: "success",
        })
      );
      navigate("/account");
    }
    setIsSavingChanges(false);
  };

  return (
    <StyledContainer>
      {/* <FormFieldLabel>Actions</FormFieldLabel>
      <Button variant="danger">Deactivate Account</Button> */}
      <StyledPlanForm>
        <FormFieldLabel>Name</FormFieldLabel>
        <Input
          value={userName}
          onChange={({ target: { value } }) => setUserName(value)}
          fullwidth
        />
      </StyledPlanForm>
      <StyledPlanForm>
        <FormFieldLabel>Active Plan</FormFieldLabel>
        <StyledPlanExpirationLabel>Lite</StyledPlanExpirationLabel>
        {/* TODO: plan options will only be displayed if user is business' admin */}
        {/* <StyledPlanOptionsButton>See plan options</StyledPlanOptionsButton> */}
      </StyledPlanForm>
      <Button disabled={!maySaveChanges} onClick={onSaveChanges}>
        Save Changes
      </Button>
    </StyledContainer>
  );
}
