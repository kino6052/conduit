import { Tag as _Tag } from "./Tag";
import { memo } from "react";
import { withEventWrapper } from "../../utils/withEventWrapper";
import { ETagConstant } from "./constants";

export { Tags } from './Tags';

export const Tag = withEventWrapper({
  handlers: ["onClick"],
  slug: ETagConstant.Slug
})(memo(_Tag));
