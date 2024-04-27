import type { Meta, StoryObj } from "@storybook/react";
import SchemaFormStory from "./SchemaForm";
import { loginFormProps } from "@/mock/loginFormProps";
import { schemaFormProps } from "@/mock/schemaFormProps";

const meta = {
  title: "Schema Form",
  component: SchemaFormStory,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { ...schemaFormProps },
} satisfies Meta<typeof SchemaFormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    ...meta.args,
  },
};

export const Login: Story = {
  args: {
    ...loginFormProps,
  },
};
