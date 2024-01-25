import { withEventWrapper } from "../../utils/withEventWrapper";
import { Button as _Button } from "./Button";

export const Button = withEventWrapper({
  handlers: ["onClick"],
  slug: "Button"
})(_Button);
