import type { Meta, StoryObj } from "@storybook/react";

import Calendar from "../../src/components/common/calendar";

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
    outlinedDays: Array.from({ length: 31 }, (_, index) =>
      [8, 11, 12, 20].includes(index)
    ),
    allClickable: false,
  },
};
