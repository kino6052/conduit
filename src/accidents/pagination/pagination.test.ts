import { describe, expect, it } from "bun:test";
import { paginate } from "./pagination";

describe("paginate", () => {
  it("returns the first page of items", () => {
    expect(paginate([1, 2, 3, 4, 5], 1, 2)).toEqual([1, 2]);
  });

  it("returns a later page", () => {
    expect(paginate([1, 2, 3, 4, 5], 2, 2)).toEqual([3, 4]);
  });

  it("returns an empty page past the end", () => {
    expect(paginate([1, 2, 3], 3, 2)).toEqual([]);
  });
});
