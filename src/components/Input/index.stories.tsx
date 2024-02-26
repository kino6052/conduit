import { Input } from ".";
import { TInputProps } from "./Input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {},
};

export const Default: { args: TInputProps } = {
  args: {
    value: "Test",
  },
};
