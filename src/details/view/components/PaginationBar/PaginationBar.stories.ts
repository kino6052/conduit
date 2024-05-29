import { PaginationBar } from ".";
import { TPaginationBarProps } from "./types";

export default {
  title: "Components/PaginationBar",
  component: PaginationBar,
};

export const Default = {
  args: {
    className: {},
    pages: [
      {
        isSelected: true,
        onClick: async () => {},
        text: "1",
      },
    ],
  } as TPaginationBarProps,
};
