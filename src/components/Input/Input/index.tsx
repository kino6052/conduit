import { memo } from "react";
import { withEventWrapper } from "../../../utils/withEventWrapper";
import { Input as _Input } from "./Input";
import { EInputConstants } from "./constants";

export const Input = withEventWrapper({
  handlers: ["onClick", "onChange"],
  slug: EInputConstants.Slug,
})(memo(_Input));
