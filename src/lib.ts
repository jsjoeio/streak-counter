export interface Streak {
  currentCount: number;
  startDate: string;
  lastLoginDate: string;
}

// Used when storing in localStorage
export const KEY = "streak";

export function formattedDate(date: Date): string {
  // NOTE@jsjoeio
  // sometimes this returns 11/11/2021
  // other times it returns 11/11/2021, 12:00:00 AM
  // which is why we call the .split at the end
  return date.toLocaleString("en-US").split(",")[0];
}

export function buildStreak(
  date: Date,
  overrideDefaults?: Partial<Streak>
): Streak {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  };

  return {
    ...defaultStreak,
    ...overrideDefaults,
  };
}

export function updateStreak(_localStorage: Storage, streak: Streak): void {
  _localStorage.setItem(KEY, JSON.stringify(streak));
}
