/**
 *
 */
import { getMonth } from "./index";
// Nouveaux tests à implémenter

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function returns 'janvier' for 2022-01-01 as date", () => {
      const result = getMonth(new Date("2022-01-01"));
      expect(result).toBe("janvier");
    });

    it("the function returns 'juillet' for 2022-07-08 as date", () => {
      const result = getMonth(new Date("2022-07-08"));
      expect(result).toBe("juillet");
    });
  });
});
