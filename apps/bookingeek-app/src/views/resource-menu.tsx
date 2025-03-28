import { useNavigate, useOutletContext } from "react-router";
import styled from "styled-components";
import Toggle from "../components/common/toggle";
import { Resource, UpdateResourcePayload } from "@bookingeek/core";
import { useState } from "react";
import { useUpdateResourceMutation } from "../store/resources-api";
import { useAppDispatch } from "../store/store";
import { toastNotificationShown } from "../store/common-slice";

const StyledMenuItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  border-bottom: 1px solid #dddddd;
  &:hover {
    background: #f4f4f4;
  }
`;

const StyledActivationlabel = styled.p<{ isActive: boolean }>`
  font-weight: 600;
  color: ${(props) => (props.isActive ? "inherit" : "#AA3131")};
`;

const StyledActivationToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
`;

const StyledMenuItemTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const StyledMenuItemDescription = styled.p`
  font-size: 16px;
`;

const MENU_ITEMS: Array<{
  title: string;
  description: string;
  action: string;
  disabled?: boolean;
}> = [
  {
    title: "Basic Info",
    description: "Title, image, price, etc",
    action: "basic-info",
  },
  {
    title: "Extra Data Fields",
    description: "Set extra data that you want to ask users while scheduling.",
    action: "extra-data-fields",
  },
  {
    title: "Schedule Type",
    description: "Set how people may book your time.",
    action: "schedule-type",
  },
  {
    title: "Schedule Availability",
    description: "Set your available time.",
    action: "availability",
  },
  {
    title: "Schedule Unavailability",
    description:
      "Set specific dates in the year where your availability differ.",
    action: "unavailability",
  },
  {
    title: "Custom Prices",
    description: "Set different prices for specific dates/times in the year.",
    action: "custom-prices",
    disabled: true,
  },
];

export default function ResourceMenuView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [updateResource] = useUpdateResourceMutation();
  const resource = useOutletContext<Resource<string>>();
  const [resourceIsActive, setResourceIsActive] = useState(resource.isActive);
  const [updatingResource, setUpdatingResource] = useState(false);
  const currentPath = window.location.pathname;

  const onToggleResource = async (isActive: boolean) => {
    setResourceIsActive(isActive);
    setUpdatingResource(true);
    const updateResourcePayload: UpdateResourcePayload = {
      ...resource,
      isActive,
    };
    const { data, error } = await updateResource({
      dto: updateResourcePayload,
      id: resource._id,
    });
    if (error) {
      console.log(error);
      // TODO: handle error
    }
    if (data) {
      dispatch(
        toastNotificationShown({
          message: `Resource ${isActive ? "activated" : "deactivated"} successfully.`,
          type: "success",
        })
      );
    }
    setUpdatingResource(false);
  };

  return (
    <>
      <StyledActivationToggleContainer>
        <Toggle
          active={resourceIsActive}
          onChange={onToggleResource}
          disabled={updatingResource}
        />
        <StyledActivationlabel isActive={resourceIsActive}>
          Resource is {resourceIsActive ? "active" : "inactive"}
        </StyledActivationlabel>
      </StyledActivationToggleContainer>
      {MENU_ITEMS.map(({ action, description, title, disabled }) => (
        <StyledMenuItem
          onClick={() =>
            disabled ? null : navigate(`${currentPath}/${action}`)
          }
        >
          <StyledMenuItemTitle>{title}</StyledMenuItemTitle>
          <StyledMenuItemDescription>
            {disabled ? <i>Coming soon</i> : description}
          </StyledMenuItemDescription>
        </StyledMenuItem>
      ))}
    </>
  );
}
