import { describe, expect, it } from "vitest";
import { getNextPrayer } from "../utils/getNextPrayer";
const pTimes = ["04:41", "06:15", "12:53", "16:28", "19:31", "20:54"];
const expections = [
  { hour: 19, exp: "Isha" },
  { hour: 16, exp: "Maghrib" },
  { hour: 20, exp: "Fajr" },
  { hour: 6, exp: "Dhur" },
  { hour: 12, exp: "Asr" },
];
describe("Test Next Prayer Time", () => {
  expections.forEach((item) => {
    it("should true", () => {
      expect(getNextPrayer(pTimes, item.hour)).toEqual(item.exp);
    });
  });
});
