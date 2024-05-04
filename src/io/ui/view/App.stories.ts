import { initializeAppState } from "../../../model";
import { withLogic } from "../../../utils/withLogic";
import { UI } from "../store";
import { App as AppComponent } from "./App";

const ui = new UI(initializeAppState());

export default {
  title: "Components/App",
  component: withLogic(ui.onPropsChange.bind(ui))(AppComponent),
};

export const Default = {
  args: {},
};
