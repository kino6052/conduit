import { EPage } from "../../app/entities/pages/types";
import { withLogic } from "../../utils/withLogic";
import { App } from "./App";
import { TAppProps } from "./types";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);

export const render = (
  onPropsChange: (cb: (props: TAppProps<EPage> | undefined) => void) => void,
) => {
  root.render(withLogic(onPropsChange)(App));
};
