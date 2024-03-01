import { TBannerProps } from "../components/Banner/types";
import { TPaginationBarProps } from "../components/PaginationBar/types";
import { TPostProps } from "../components/Post/types";
import { TSidebarProps } from "../components/Sidebar/types";
import { TTabProps } from "../components/Tab/types";
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
