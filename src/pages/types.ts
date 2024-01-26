import { TBannerProps } from "../components/Banner/Banner";
import { TPaginationBarProps } from "../components/PaginationBar/PaginationBar";
import { TPostProps } from "../components/Post/Post";
import { TSidebarProps } from "../components/Sidebar/types";
import { TTabProps } from "../components/Tab/Tab";
import { RecursivePartial } from "../utils/types";

export type TPageProps = RecursivePartial<{
  username: "eni9mu5";
  bannerProps: TBannerProps;
  sidebarProps: TSidebarProps;
  posts: TPostProps[];
  tabs: TTabProps[];
  paginationBarProps?: TPaginationBarProps;
  input: string;
}>;
