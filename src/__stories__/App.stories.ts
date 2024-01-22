import { App } from "../App";
import { DefaultAppProps } from "../data";
import { EventSubject } from "../utils/events";
import { withLogic } from "../utils/withLogic";
import { logic } from "./logic";

export default {
  title: "Components/App",
  component: withLogic(logic)(App),
};

export const Default = {
  args: DefaultAppProps,
};

EventSubject.subscribe(console.warn);
