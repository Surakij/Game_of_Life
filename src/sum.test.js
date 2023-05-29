import { sum } from "./sum";

describe("sum", () => {
  it("should return sum of numbers a & b", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
