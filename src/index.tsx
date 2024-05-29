import { defaultComposeApp } from "./details";
import { render } from "./details/view";

const viewModel = defaultComposeApp();

render(viewModel.onPropsChange.bind(viewModel));
