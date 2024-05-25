
import ReactDOMClient from "react-dom";
import { App } from "./io/ui/view/App";
import { withLogic } from "./utils/withLogic";
import { defaultComposeApp } from "./utils";

const viewModel = defaultComposeApp();
const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);

root.render(withLogic(viewModel.onPropsChange.bind(viewModel))(App));