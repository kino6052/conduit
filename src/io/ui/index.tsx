import React from "react";
import ReactDOMClient from "react-dom";
import { App } from "./io/ui/view/App";
import { DefaultAppProps } from "./data";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<App {...DefaultAppProps} />);
