import { SignUpPage } from ".";
import { DefaultData } from "./data";
import { TSignUpPageProps } from "./types";

export default {
  title: "Pages/SignUp",
  component: SignUpPage,
  argTypes: {},
};

export const Default: { args: TSignUpPageProps } = {
  args: DefaultData,
};
