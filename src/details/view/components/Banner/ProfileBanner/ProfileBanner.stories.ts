import { TProfileBannerProps } from "./types";
import { ProfileBanner } from "./ProfileBanner";

export default {
  title: "Components/Banner/ProfileBanner",
  component: ProfileBanner,
  argTypes: {},
};

export const Default = {
  args: {
    userInfoProps: {
      date: new Date().toISOString(),
      username: "John Lobster",
    },
  } as TProfileBannerProps,
};
