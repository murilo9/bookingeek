import type { Meta, StoryObj } from "@storybook/react";

import Calendar from "./calendar";

const meta = {
  title: "Components/Common/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    allClickable: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    monthIndex: 10,
    year: 2024,
    activeDay: new Date().getDate(),
    outlinedDays: [9, 12, 13, 21],
    allClickable: false,
  },
};
