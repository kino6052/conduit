import { defaultComposeApp } from "./details";
import { render } from "./details/view";

// This is the entry of the application, where we bootstrap a view model
const viewModel = defaultComposeApp();

// and then render it 
render(viewModel);
