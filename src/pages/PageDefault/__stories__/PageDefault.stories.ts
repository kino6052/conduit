
import { EventSubject } from "../../../utils/events";
import { withLogic } from "../../../utils/withLogic";
import { DefaultState, PageDefault } from "../PageDefault";
import { logic } from "./logic";

export default {
  title: "Components/PageDefault",
  component: withLogic(logic)(PageDefault),
};

export const Default = {
  args: DefaultState,
};

EventSubject.subscribe(console.warn);
