import { CommentInput } from ".";
import { TCommentInputProps, TInputProps } from "../types";

export default {
  title: "Components/Input/Comment",
  component: CommentInput,
  argTypes: {},
};

export const Default: { args: TCommentInputProps } = {
  args: {
    buttonProps: {
      text: "Submit",
    },
    iconProps: {
      icon: "favorite",
    },
    inputProps: {
      placeholder: "Input your comment",
      value: "",
    },
  },
};
