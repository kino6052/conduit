import { render } from "./details/ui/view";
import { defaultComposeApp } from "./app";

const viewModel = defaultComposeApp();

render(viewModel.onPropsChange.bind(viewModel));
