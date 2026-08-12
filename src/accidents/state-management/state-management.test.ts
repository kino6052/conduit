import { describe, expect, it } from "bun:test";
import { createMemoryState, createRxState } from "./state-management";

describe("createMemoryState", () => {
  it("starts at the given initial value", () => {
    const state = createMemoryState({ count: 0 });

    expect(state.getState()).toEqual({ count: 0 });
  });

  it("setState changes what getState returns", () => {
    const state = createMemoryState({ count: 0 });

    state.setState({ count: 1 });

    expect(state.getState()).toEqual({ count: 1 });
  });

  it("notifies subscribers with the new value", () => {
    const state = createMemoryState({ count: 0 });
    const seen: { count: number }[] = [];
    state.subscribe((next) => seen.push(next));

    state.setState({ count: 1 });

    expect(seen).toEqual([{ count: 1 }]);
  });

  it("stops notifying once unsubscribed", () => {
    const state = createMemoryState({ count: 0 });
    const seen: { count: number }[] = [];
    const unsubscribe = state.subscribe((next) => seen.push(next));
    unsubscribe();

    state.setState({ count: 1 });

    expect(seen).toEqual([]);
  });
});

describe("createRxState", () => {
  it("starts at the given initial value", () => {
    const state = createRxState({ count: 0 });

    expect(state.getState()).toEqual({ count: 0 });
  });

  it("setState changes what getState returns", () => {
    const state = createRxState({ count: 0 });

    state.setState({ count: 1 });

    expect(state.getState()).toEqual({ count: 1 });
  });

  it("notifies subscribers with the new value", () => {
    const state = createRxState({ count: 0 });
    const seen: { count: number }[] = [];
    state.subscribe((next) => seen.push(next));

    state.setState({ count: 1 });

    expect(seen).toEqual([{ count: 1 }]);
  });

  it("stops notifying once unsubscribed", () => {
    const state = createRxState({ count: 0 });
    const seen: { count: number }[] = [];
    const unsubscribe = state.subscribe((next) => seen.push(next));
    unsubscribe();

    state.setState({ count: 1 });

    expect(seen).toEqual([]);
  });

  it("does not replay the initial value to a subscriber joining later", () => {
    const state = createRxState({ count: 0 });
    const seen: { count: number }[] = [];

    state.subscribe((next) => seen.push(next));

    expect(seen).toEqual([]);
  });
});
