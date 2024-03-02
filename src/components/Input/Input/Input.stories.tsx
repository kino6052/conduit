import { Input } from ".";
import { TInputProps } from "../types";

export default {
  title: "Components/Input/Default",
  component: Input,
  argTypes: {},
};

export const Default: { args: TInputProps } = {
  args: {
    value: "Test",
    placeholder: "Input",
  },
};
