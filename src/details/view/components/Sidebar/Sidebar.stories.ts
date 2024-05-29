import { Sidebar } from ".";
import { TSidebarProps } from "./types";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
};

export const Default = {
  args: {
    title: "Tags",
    tags: [
      { id: "1", text: "One" },
      { id: "2", text: "Two" },
      { id: "3", text: "Three" },
    ],
  } as TSidebarProps,
};
