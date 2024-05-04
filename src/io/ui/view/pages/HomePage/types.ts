import { TWithOnMountHandler } from "../../../../../utils/types";
import { TArticleProps } from "../../components/Article/types";
import { TPaginationBarProps } from "../../components/PaginationBar/types";
import { TSidebarProps } from "../../components/Sidebar/types";
import { TTabProps } from "../../components/Tab/types";

export type THomePageProps = TWithOnMountHandler<{
  tabs: TTabProps[];
  sidebarProps: TSidebarProps;
  posts: TArticleProps[];
  paginationBarProps: TPaginationBarProps;
  isLoading: boolean;
}>;
