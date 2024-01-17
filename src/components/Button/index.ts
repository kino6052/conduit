import { withEventWrapper } from "../../utils/withEventWrapper";
import { Button as _Button, slug } from "./Button";

export const Button = withEventWrapper({
  handlers: ["onClick"],
  slug,
})(_Button);
