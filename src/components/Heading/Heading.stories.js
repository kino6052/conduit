import { Heading } from ".";

export default {
  title: "Components/Heading",
  component: Heading,
  argTypes: {
    variant: {
      options: ["regular", "regular-bold", "regular-grey", "h-1", "h-2"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    value: "This is text",
    variant: "regular",
    className: {},
    textClassName: {},
  },
};
