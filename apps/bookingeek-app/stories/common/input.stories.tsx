import type { Meta, StoryObj } from "@storybook/react";
import Input from "../../src/components/common/input";

const meta = {
  title: "Components/Common/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {},
};
