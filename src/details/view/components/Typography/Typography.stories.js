import { Typography } from ".";

export default {
  title: "Components/Typography",
  component: Typography,
  argTypes: {
    variant: {
      options: ["regular", "regular-bold", "regular-grey", "h1", "h2"],
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
