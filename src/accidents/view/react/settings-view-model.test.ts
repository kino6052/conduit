import { describe, expect, it } from "bun:test";
import { createInitialState, TState } from "../../../essence/state";
import { selectBio } from "../../../essence/bio";
import { selectAvatarUrl } from "../../../essence/avatar";
import { compileSettingsViewModel } from "./settings-view-model";

function makeState(initial: TState) {
  let current = initial;
  const getState = () => current;
  const setState = (next: TState) => {
    current = next;
  };
  return { getState, setState };
}

describe("compileSettingsViewModel", () => {
  it("shows the acting identity's current bio and avatar, empty if never set", () => {
    const { getState, setState } = makeState(createInitialState());

    const viewModel = compileSettingsViewModel(getState, setState);

    expect(viewModel.bio).toBe("");
    expect(viewModel.avatarUrl).toBe("");
  });

  it("shows a previously set bio and avatar", () => {
    const { getState, setState } = makeState({
      ...createInitialState(),
      bios: [{ name: "you", text: "existing bio" }],
      avatarUrls: [{ name: "you", url: "https://example.com/you.png" }],
    });

    const viewModel = compileSettingsViewModel(getState, setState);

    expect(viewModel.bio).toBe("existing bio");
    expect(viewModel.avatarUrl).toBe("https://example.com/you.png");
  });

  it("onSaveClick sets both the bio and the avatar through essence", () => {
    const { getState, setState } = makeState(createInitialState());
    const viewModel = compileSettingsViewModel(getState, setState);

    viewModel.onSaveClick("new bio", "https://example.com/new.png");

    expect(selectBio(getState(), "you")).toBe("new bio");
    expect(selectAvatarUrl(getState(), "you")).toBe("https://example.com/new.png");
  });
});
