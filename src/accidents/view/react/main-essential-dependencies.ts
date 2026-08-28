// The mount point for src/index.essential-dependencies.ts -- same shape as
// main.ts, just handing ReactDOM the other composition root's App. No
// logic here, nothing to test.

import React from "react";
import { createRoot } from "react-dom/client";
import App from "../../../index.essential-dependencies";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(React.createElement(App));
}
