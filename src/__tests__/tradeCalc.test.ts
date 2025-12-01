import { describe, it, expect } from "vitest";
import { calculateFailedTrades } from "@/lib/utils";

describe("calculateFailedTrades", () => {
  it("handles basic subtraction", () => {
    expect(calculateFailedTrades(10, 6)).toBe(4);
  });
  it("clamps at zero", () => {
    expect(calculateFailedTrades(5, 7)).toBe(0);
  });
  it("handles zeros", () => {
    expect(calculateFailedTrades(0, 0)).toBe(0);
  });
  it("rejects negatives", () => {
    expect(calculateFailedTrades(-1, 1)).toBe(0);
    expect(calculateFailedTrades(5, -2)).toBe(0);
  });
  it("non-finite becomes zero", () => {
    // @ts-expect-error
    expect(calculateFailedTrades(Number.NaN, 1)).toBe(0);
  });
});
