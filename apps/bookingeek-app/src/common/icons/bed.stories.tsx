import type { Meta, StoryObj } from "@storybook/react";
import BedIcon from "./bed";

const meta = {
  title: "Icons/Bed",
  component: BedIcon,
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
} satisfies Meta<typeof BedIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    color: "#222222",
    size: 24,
  },
};
