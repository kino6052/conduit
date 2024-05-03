import { App as AppComponent } from "./App";
import { App } from "./logic/app";
import { providePagesMapWithDependencies } from "./logic/app/map";
import { ResultingStateSubject } from "./logic/common.logic";
import { ArticleDatabase } from "./logic/data/article";
import { Navbar } from "./logic/home/logic";
import { UI } from "./store";
import { EPage } from "./types";
import { EventSubject } from "./utils/events";
import { withLogic } from "./utils/withLogic";

const navbar = new Navbar(EPage.Home);
const articleSource = new ArticleDatabase();
const pageMap = providePagesMapWithDependencies({
  navbar,
  articleSource,
});
const app = new App(pageMap, navbar);
const ui = new UI(app);

export default {
  title: "Components/App",
  component: withLogic(ui.onPropsChange.bind(ui))(AppComponent),
};

export const Default = {
  args: ResultingStateSubject.getValue(),
};

EventSubject.subscribe(console.warn);
