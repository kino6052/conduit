import { render } from "./io/ui/view";
import { defaultComposeApp } from "./utils";

const viewModel = defaultComposeApp();

render(viewModel.onPropsChange.bind(viewModel));
