import type { Meta, StoryObj } from "@storybook/react";

import CalendarPicker from "./calendar-picker";

const meta = {
  title: "Components/Common/CalendarPicker",
  component: CalendarPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CalendarPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    value: new Date(),
    onChange: console.log,
    availableDates: [new Date(2024, 11, 20)],
  },
};
