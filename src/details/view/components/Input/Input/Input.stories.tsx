import { Input } from ".";
import { TInputProps } from "../types";

export default {
  title: "Components/Input/Default",
  component: Input,
  argTypes: {},
};

export const Default: { args: TInputProps } = {
  args: {
    id: "one",
    value: "Test",
    placeholder: "Input",
  },
};

export const WithError: { args: TInputProps } = {
  args: {
    id: "one",
    value: "Test",
    placeholder: "Input",
    error: "Something is not right!",
  },
};

export const TextAreaWithError: { args: TInputProps } = {
  args: {
    isTextArea: true,
    id: "one",
    value: "Test",
    placeholder: "Input",
    error: "Something is not right!",
  },
};
