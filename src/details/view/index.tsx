import { IViewModel } from "../view-model/types";
import { withLogic } from "../../utils/withLogic";
import { App } from "./App";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);

export const render = (viewModel: IViewModel) => {
  root.render(withLogic(viewModel.onPropsChange.bind(viewModel))(App));
};
