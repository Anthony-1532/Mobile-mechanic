import { describe, expect, it } from "vitest";
import { healthMessage } from "./index";

describe("shared", () => {
  it("exposes a non-empty health message", () => {
    expect(healthMessage.length).toBeGreaterThan(0);
  });
});
