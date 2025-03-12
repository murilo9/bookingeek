import type { Meta, StoryObj } from "@storybook/react";
import ToggleOffIcon from "./toggle-off";

const meta = {
  title: "Icons/ToggleOff",
  component: ToggleOffIcon,
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
} satisfies Meta<typeof ToggleOffIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    color: "#222222",
    size: 24,
  },
};
