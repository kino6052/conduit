import { withEventWrapper } from "../../utils/withEventWrapper";
import {
  PaginationButton as _PaginationButton,
  slug,
} from "./PaginationButton";

export const PaginationButton = withEventWrapper({
  slug: _PaginationButton.name,
  handlers: ["onClick", "onBlur", "onKeyDown"],
})(_PaginationButton);
