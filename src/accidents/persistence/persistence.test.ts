import { describe, expect, it } from "bun:test";
import { createMemoryPersistence } from "./persistence";

describe("createMemoryPersistence", () => {
  it("starts with nothing to load", () => {
    const persistence = createMemoryPersistence<string>();

    expect(persistence.load()).toBeUndefined();
  });

  it("save makes the value available to load", () => {
    const persistence = createMemoryPersistence<string>();

    persistence.save("alice");

    expect(persistence.load()).toBe("alice");
  });

  it("clear removes the saved value", () => {
    const persistence = createMemoryPersistence<string>();
    persistence.save("alice");

    persistence.clear();

    expect(persistence.load()).toBeUndefined();
  });
});
