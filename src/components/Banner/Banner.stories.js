import { Banner } from ".";

export default {
  title: "Components/Banner",
  component: Banner,
  argTypes: {
    variant: {
      options: ["user-info", "article", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    variant: "user-info",
    className: {},
  },
};
