// The mount point -- literally the same one essence-view uses
// (src/accidents/view/essence/main.ts), imported unchanged. This accident
// adds nothing to the render functions or the composition root
// (src/index.essence.ts) -- same essence, same behavior -- only a
// minimal stylesheet (styles.css) and this HTML shell (index.html) sit on
// top of it. "Builds on top of the essence-view" in the most literal
// sense: not a fork, a presentation layer.
import "../essence/main";
