import type { Meta, StoryObj } from "@storybook/react";

import Button from "./button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
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
    color: "primary",
    children: "Button",
  },
};
