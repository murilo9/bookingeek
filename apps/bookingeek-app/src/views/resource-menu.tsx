import { useNavigate } from "react-router";
import styled from "styled-components";

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
  },
];

export default function ResourceMenuView() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return MENU_ITEMS.map(({ action, description, title }) => (
    <StyledMenuItem onClick={() => navigate(`${currentPath}/${action}`)}>
      <StyledMenuItemTitle>{title}</StyledMenuItemTitle>
      <StyledMenuItemDescription>{description}</StyledMenuItemDescription>
    </StyledMenuItem>
  ));
}
