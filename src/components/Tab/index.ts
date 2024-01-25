import { memo } from "react";
import { Tab as _Tab } from "./Tab";
import { withEventWrapper } from "../../utils/withEventWrapper";

export const Tab = withEventWrapper({
  handlers: ["onClick"],
  slug: "Tab"
})(memo(_Tab));