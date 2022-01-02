import { formattedDate } from "./lib";

interface Streak {
  currentCount: number;
  startDate: string;
  lastLoginDate: string;
}

// Used when storing in localStorage
const KEY = "streak";

export function streakCounter(_localStorage: Storage, date: Date): Streak {
  const streak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  };

  // store in localStorage
  _localStorage.setItem(KEY, JSON.stringify(streak));

  return streak;
}
