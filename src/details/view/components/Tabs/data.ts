import { ETabVariant, TTabProps } from "../Tab/types";
import { ETabsPanelConstant } from "./constants";

export const GlobalFeedTab: TTabProps = {
  id: ETabsPanelConstant.GeneralTabId,
  text: "Global Feed",
  variant: ETabVariant.Default,
};

export const YourFeedTab: TTabProps = {
  id: ETabsPanelConstant.PersonalTabId,
  text: "Your Feed",
  variant: ETabVariant.Default,
};
