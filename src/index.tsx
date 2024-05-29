import { defaultComposeApp } from "./app";
import { render } from "./details/ui/view";

const viewModel = defaultComposeApp();

render(viewModel.onPropsChange.bind(viewModel));
