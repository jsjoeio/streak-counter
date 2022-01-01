import { JSDOM } from "jsdom";
import { streakCounter } from "../src/index";

describe("streakCounter", () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDom = new JSDOM("", { url: "https://localhost" });

    mockLocalStorage = mockJSDom.window.localStorage;
  });

  it("should return a 'streak' object with currentCount, starteDate and lastLoginDate", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    expect(Object.prototype.hasOwnProperty.call(streak, "currentCount")).toBe(
      true
    );
    expect(Object.prototype.hasOwnProperty.call(streak, "startDate")).toBe(
      true
    );
    expect(Object.prototype.hasOwnProperty.call(streak, "lastLoginDate")).toBe(
      true
    );
  });
});
