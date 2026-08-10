import { defaultComposeApp } from "..";
import { withLogic } from "../../utils/withLogic";
import { App as AppComponent } from "./App";

const viewModel = defaultComposeApp();

export default {
  title: "Logic/App",
  component: withLogic(viewModel.onPropsChange.bind(viewModel))(AppComponent),
};

export const Default = {
  args: {},
};
