// The actual mount point -- not part of code-example.md's own listing (it
// stops at "export default createCompositionRoot()"), but the natural next
// step: hand the assembled App to ReactDOM. No logic here, nothing to test.

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./composition-root";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(React.createElement(App));
}
