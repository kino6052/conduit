import { CommentInput } from ".";
import { TCommentInputProps } from "../types";
import { DefaultData } from "./data";

export default {
  title: "Components/Input/Comment",
  component: CommentInput,
  argTypes: {},
};

export const Default: { args: TCommentInputProps } = {
  args: DefaultData,
};
