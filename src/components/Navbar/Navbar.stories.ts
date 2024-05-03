import { Navbar } from ".";
import { TNavbarProps } from "./types";

export default {
  title: "Components/Navbar",
  component: Navbar,
};

export const Default = {
  args: {
    className: {},
    logo: {},
    tabs: [
      { id: "home", text: "Home" },
      { id: "profile", text: "Profile" },
    ],
  } as TNavbarProps,
};
