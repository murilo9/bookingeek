import type { Meta, StoryObj } from "@storybook/react";
import BuildingIcon from "./building";

const meta = {
  title: "Icons/Building",
  component: BuildingIcon,
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
} satisfies Meta<typeof BuildingIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    color: "#222222",
    size: 24,
  },
};
