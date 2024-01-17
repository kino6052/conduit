import React from "react";
import ReactDOMClient from "react-dom/client";
import { PageDefaultScreen } from "./screens/PageDefaultScreen";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<PageDefaultScreen />);
