import { describe, expect, it } from "bun:test";
import { compileHeaderViewModel } from "./header-view-model";

describe("compileHeaderViewModel", () => {
  it("is the Home tab when no article is open", () => {
    const headerViewModel = compileHeaderViewModel(null, () => {});

    expect(headerViewModel.isHome).toBe(true);
  });

  it("is not the Home tab while reading an article", () => {
    const headerViewModel = compileHeaderViewModel("Some Title", () => {});

    expect(headerViewModel.isHome).toBe(false);
  });

  it("onHomeClick calls the given onGoHome", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel("Some Title", () => {
      called = true;
    });

    headerViewModel.onHomeClick();

    expect(called).toBe(true);
  });
});
