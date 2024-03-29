import { withEventWrapper } from "../../utils/withEventWrapper";
import { Link as _Link } from "./Link";
import { ELinkConstant } from "./constants";

export const Link = withEventWrapper({
  handlers: ["onClick"],
  slug: ELinkConstant.LinkSlug
})(_Link);
