import { defaultComposeApp } from "./details/composition-root";
import { render } from "./details/view";

const viewModel = defaultComposeApp();

render(viewModel.onPropsChange.bind(viewModel));
