import { JSDOM } from "jsdom";
import { streakCounter } from "../src/index";
import { formattedDate } from "../src/lib";

describe("streakCounter", () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDom = new JSDOM("", { url: "https://localhost" });

    mockLocalStorage = mockJSDom.window.localStorage;
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("should return a streak object with currentCount, starteDate and lastLoginDate", () => {
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
  it("should return a streak starting at 1 and keep track of lastLoginDate", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    const dateFormatted = formattedDate(date);

    expect(streak.currentCount).toBe(1);
    expect(streak.lastLoginDate).toBe(dateFormatted);
  });
  it("should store the streak in localStorage", () => {
    const date = new Date();
    const key = "streak";
    streakCounter(mockLocalStorage, date);

    const streakAsString = mockLocalStorage.getItem(key);
    expect(streakAsString).not.toBeNull();
  });
  describe("with a prepopulated streak", () => {
    let mockLocalStorage: Storage;
    beforeEach(() => {
      const mockJSDom = new JSDOM("", { url: "https://localhost" });

      mockLocalStorage = mockJSDom.window.localStorage;

      // Use date in past so it doesn't
      // conflict if test uses date test runs.
      const date = new Date("2021-12-12");

      const streak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date),
      };

      mockLocalStorage.setItem("streak", JSON.stringify(streak));
    });
    afterEach(() => {
      mockLocalStorage.clear();
    });
    it("should return the streak from localStorage", () => {
      const date = new Date("2021-12-12");
      const streak = streakCounter(mockLocalStorage, date);

      // Should match the dates used to set up the tests
      expect(streak.startDate).toBe("12/12/2021");
    });
    it("should increment the streak", () => {
      // It should increment because this is the day after
      // the streak started and a streak is days in a row.
      const date = new Date("2021-12-13");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.currentCount).toBe(2);
    });
    it("should not increment the streak when login days not consecutive", () => {
      // It should not increment because this is two days after
      // the streak started and the days aren't consecutive.
      const date = new Date("2021-12-14");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.currentCount).toBe(1);
    });
    it("should save the incremented streak to localStorage", () => {
      const key = "streak";
      const date = new Date("2021-12-13");
      // Call it once so it updates the streak
      streakCounter(mockLocalStorage, date);

      const streakAsString = mockLocalStorage.getItem(key);
      // Normally you should wrap in try/catch in case the JSON is bad
      // but since we authored it, we can skip here
      const streak = JSON.parse(streakAsString || "");

      expect(streak.currentCount).toBe(2);
    });
    it("should reset if not consecutive", () => {
      const date = new Date("2021-12-13");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.currentCount).toBe(2);

      // Skip a day and break the streak
      const _date = new Date("2021-12-15");
      const _streak = streakCounter(mockLocalStorage, _date);

      expect(_streak.currentCount).toBe(1);
    });
    it("should save the reset streak to localStorage", () => {
      const key = "streak";
      const date = new Date("2021-12-13");
      // Call it once so it updates the streak
      streakCounter(mockLocalStorage, date);

      // Skip a day and break the streak
      const _date = new Date("2021-12-15");
      const _streak = streakCounter(mockLocalStorage, _date);

      const streakAsString = mockLocalStorage.getItem(key);
      // Normally you should wrap in try/catch in case the JSON is bad
      // but since we authored it, we can skip here
      const streak = JSON.parse(streakAsString || "");

      expect(streak.currentCount).toBe(1);
    });
    it("should not reset the streak for same-day login", () => {
      const date = new Date("2021-12-13");
      // Call it once so it updates the streak
      streakCounter(mockLocalStorage, date);

      // Simulate same-day login
      const _date = new Date("2021-12-13");
      const _streak = streakCounter(mockLocalStorage, _date);

      expect(_streak.currentCount).toBe(2);
    });
  });
});
