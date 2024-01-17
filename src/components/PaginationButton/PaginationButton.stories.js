import { PaginationButton } from ".";

export default {
  title: "Components/PaginationButton",
  component: PaginationButton,
  argTypes: {
    variant: {
      options: ["selected", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    value: "1",
    isSelected: true,
    variant: "selected",
    className: {},
  },
};
