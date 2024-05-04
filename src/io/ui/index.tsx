import React from "react";
import ReactDOMClient from "react-dom";
import { App } from "./view/App";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<App />);
