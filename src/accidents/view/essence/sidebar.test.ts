import { describe, expect, it } from "bun:test";
import { renderSidebar } from "./sidebar";

describe("renderSidebar", () => {
  it("renders a button for every named state", () => {
    const html = renderSidebar(["Empty feed", "Global feed"], "Empty feed");

    expect(html).toContain(`data-action="select-state" data-state-name="Empty feed"`);
    expect(html).toContain(`data-action="select-state" data-state-name="Global feed"`);
  });

  it("marks the currently selected state", () => {
    const html = renderSidebar(["Empty feed", "Global feed"], "Global feed");

    expect(html).toContain(
      `data-action="select-state" data-state-name="Global feed" aria-current="true"`,
    );
    expect(html).not.toContain(
      `data-action="select-state" data-state-name="Empty feed" aria-current="true"`,
    );
  });
});
