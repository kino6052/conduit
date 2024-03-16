import { memo } from "react";
import { Tab as _Tab } from "./Tab";
import { withEventWrapper } from "../../utils/withEventWrapper";
import { ETabConstant } from "./constants";

export const Tab = withEventWrapper({
  handlers: ["onClick"],
  slug: ETabConstant.Slug,
})(memo(_Tab));
