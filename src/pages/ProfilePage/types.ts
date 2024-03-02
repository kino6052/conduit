import { TProfileBannerProps } from "../../components/Banner/ProfileBanner/types";
import { TPaginationBarProps } from "../../components/PaginationBar/types";
import { TPostProps } from "../../components/Post/types";
import { TSidebarProps } from "../../components/Sidebar/types";
import { TTabProps } from "../../components/Tab/types";

export type TProfilePageProps = {
  bannerProps: TProfileBannerProps;
  tabs: TTabProps[];
  sidebarProps: TSidebarProps;
  posts: TPostProps[];
  paginationBarProps: TPaginationBarProps;
};
