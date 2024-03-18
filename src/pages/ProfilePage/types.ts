import { TProfileBannerProps } from "../../components/Banner/ProfileBanner/types";
import { TPaginationBarProps } from "../../components/PaginationBar/types";
import { TArticleProps } from "../../components/Article/types";
import { TSidebarProps } from "../../components/Sidebar/types";
import { TTabProps } from "../../components/Tab/types";

export type TProfilePageProps = {
  bannerProps: TProfileBannerProps;
  tabs: TTabProps[];
  sidebarProps: TSidebarProps;
  posts: TArticleProps[];
  paginationBarProps: TPaginationBarProps;
};
