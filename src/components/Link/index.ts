import { withEventWrapper } from "../../utils/withEventWrapper";
import { Link as _Link } from "./Link";

export const Link = withEventWrapper({
  handlers: ["onClick"],
  slug: "Link"
})(_Link);
