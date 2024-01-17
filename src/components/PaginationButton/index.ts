import { withEventWrapper } from "../../utils/withEventWrapper";
import {
  PaginationButton as _PaginationButton,
} from "./PaginationButton";

export const PaginationButton = withEventWrapper([
  "onClick", 
  "onBlur", 
  "onKeyDown"
])(_PaginationButton);
