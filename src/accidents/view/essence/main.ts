// The actual mount point for the essence view -- part of the view
// accident (README, "this is incorrect main.ts...are all parts of the
// accidents (view)"), not the composition root itself. Mirrors
// accidents/view/react/main.ts: thin, no logic of its own, just wires the
// composition root (src/index.essence.ts) to the real DOM.

import { handleClick, render } from "../../../index.essence";

document.addEventListener("click", handleClick);
render();
