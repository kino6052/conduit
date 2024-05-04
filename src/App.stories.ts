import { App as AppComponent } from "./App";
import { ResultingStateSubject } from "./logic/common.logic";
import { ArticleDatabase } from "./logic/data/article";
import { AppState, HomePage, getTabs } from "./logic/home/logic";
import { UI } from "./store";
import { EventSubject } from "./utils/events";
import { withLogic } from "./utils/withLogic";

/** TODO: Move into app initialization (factory) */
const state = new AppState();
const articleSource = new ArticleDatabase();

state.currentPage = new HomePage(state, articleSource);
state.tabs = getTabs(state, articleSource);

const ui = new UI(state);

export default {
  title: "Components/App",
  component: withLogic(ui.onPropsChange.bind(ui))(AppComponent),
};

export const Default = {
  args: ResultingStateSubject.getValue(),
};

EventSubject.subscribe(console.warn);
