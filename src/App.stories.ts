import { App } from "./App";
import { EventSubject } from "./utils/events";
import { withLogic } from "./utils/withLogic";
import { logic } from "./logic";
import { ResultingStateSubject } from "./logic/common.logic";

export default {
  title: "Components/App",
  component: withLogic(logic)(App),
};

export const Default = {
  args: ResultingStateSubject.getValue(),
};

EventSubject.subscribe(console.warn);
