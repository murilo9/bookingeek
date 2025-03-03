import type { Meta, StoryObj } from "@storybook/react";
import IconButton from "./icon-button";
import CheckFullIcon from "../../icons/check-full";

const meta = {
  title: "Components/Common/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["primary", "secondary", "danger"],
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    variant: "primary",
    children: <CheckFullIcon />,
  },
};
