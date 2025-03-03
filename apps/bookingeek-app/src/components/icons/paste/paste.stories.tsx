import type { Meta, StoryObj } from "@storybook/react";
import PasteIcon from "./paste";

const meta = {
  title: "Icons/Paste",
  component: PasteIcon,
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
} satisfies Meta<typeof PasteIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    color: "#222222",
    size: 24,
  },
};
