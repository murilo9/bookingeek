import type { Meta, StoryObj } from "@storybook/react";

import Button from "../../src/components/common/button";

const meta = {
  title: "Components/Common/Button",
  component: Button,
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
    children: { control: "text", type: "string" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};
