import { App } from "./App";
import { EventSubject } from "./utils/events";
import { withLogic } from "./utils/withLogic";
import { update } from "./logic";
import { ResultingStateSubject } from "./logic/common.logic";

export default {
  title: "Components/App",
  component: withLogic(update)(App),
};

export const Default = {
  args: ResultingStateSubject.getValue(),
};

EventSubject.subscribe(console.warn);
