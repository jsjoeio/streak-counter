import { formattedDate } from "./lib";

interface Streak {
  currentCount: number;
  startDate: string;
  lastLoginDate: string;
}

// Used when storing in localStorage
const KEY = "streak";

export function streakCounter(_localStorage: Storage, date: Date): Streak {
  const streakInLocalStorage = _localStorage.getItem(KEY);
  const doesStreakExist =
    streakInLocalStorage !== null && streakInLocalStorage !== "";

  if (doesStreakExist) {
    try {
      const streak = JSON.parse(streakInLocalStorage || "");
      return streak;
    } catch (error) {
      console.error("Failed to parse streak from localStorage");
    }
  }

  const streak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  };

  // store in localStorage
  _localStorage.setItem(KEY, JSON.stringify(streak));

  return streak;
}
