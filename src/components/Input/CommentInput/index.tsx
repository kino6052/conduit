import { memo } from "react";
import { withEventWrapper } from "../../../utils/withEventWrapper";
import { CommentInput as _CommentInput } from "./CommentInput";

export const CommentInput = withEventWrapper({
  handlers: ["onClick", "onChange", "onKeyDown"],
  slug: "Input",
})(memo(_CommentInput));
