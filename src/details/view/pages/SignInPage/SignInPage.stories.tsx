import { SignInPage } from ".";
import { DefaultData } from "./data";
import { TSignInPageProps } from "./types";

export default {
  title: "Pages/SignInPage",
  component: SignInPage,
  argTypes: {},
};

export const Default: { args: TSignInPageProps } = {
  args: DefaultData,
};
