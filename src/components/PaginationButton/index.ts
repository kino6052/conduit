import { withEventWrapper } from "../../utils/withEventWrapper";
import {
  PaginationButton as _PaginationButton,
  slug,
} from "./PaginationButton";

export const PaginationButton = withEventWrapper({
  slug,
  handlers: ["onClick", "onBlur", "onKeyDown"],
})(_PaginationButton);
