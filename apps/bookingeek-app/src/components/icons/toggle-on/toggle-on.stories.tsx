import type { Meta, StoryObj } from "@storybook/react";
import ToggleOnIcon from "./toggle-on";

const meta = {
  title: "Icons/ToggleOn",
  component: ToggleOnIcon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: {
        type: "number",
      },
    },
    color: {
      control: {
        type: "color",
      },
    },
  },
} satisfies Meta<typeof ToggleOnIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    color: "#222222",
    size: 24,
  },
};
