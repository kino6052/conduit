import { defaultComposeApp } from "../../../model";
import { withLogic } from "../../../utils/withLogic";
import { ViewModel } from "../view-model";
import { App as AppComponent } from "./App";

const viewModel = new ViewModel(defaultComposeApp());

export default {
  title: "Logic/App",
  component: withLogic(viewModel.onPropsChange.bind(viewModel))(AppComponent),
};

export const Default = {
  args: {},
};
