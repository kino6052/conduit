import { withEventWrapper } from "../../utils/withEventWrapper";
import { PaginationButton as _PaginationButton } from "./PaginationButton";
import { EPaginationButtonConstant } from "./constants";

export const PaginationButton = withEventWrapper({
  handlers: ["onClick"],
  slug: EPaginationButtonConstant.Slug,
})(_PaginationButton);
