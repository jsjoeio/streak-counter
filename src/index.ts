import { buildStreak, formattedDate, Streak } from "./lib";

// Used when storing in localStorage
const KEY = "streak";

function assertStreakExists(
  streakInLocalStorage: string | null
): streakInLocalStorage is string {
  return streakInLocalStorage !== null && streakInLocalStorage !== "";
}

function shouldIncrementOrResetStreakCount(
  currentDate: string,
  lastLoginDate: string
) {
  // We get 11/5/2021
  // so to get 5, we split on / and get the second item
  const difference =
    parseInt(currentDate.split("/")[1]) - parseInt(lastLoginDate.split("/")[1]);
  // Same-day login, do nothing
  if (difference === 0) {
    return {
      shouldIncrement: false,
      shouldReset: false,
    };
  }

  // This means they logged in the day after the currentDate
  if (difference === 1) {
    return {
      shouldIncrement: true,
      shouldReset: false,
    };
  }

  // Otherwise they logged in after a day, which would
  // break the streak
  return {
    shouldIncrement: false,
    shouldReset: true,
  };
}

export function streakCounter(_localStorage: Storage, date: Date): Streak {
  const streakInLocalStorage = _localStorage.getItem(KEY);

  if (assertStreakExists(streakInLocalStorage)) {
    try {
      const streak = JSON.parse(streakInLocalStorage);

      const { shouldIncrement, shouldReset } =
        shouldIncrementOrResetStreakCount(
          formattedDate(date),
          streak.lastLoginDate
        );

      if (shouldIncrement) {
        const updatedStreak: Streak = {
          ...streak,
          currentCount: streak.currentCount + 1,
          lastLoginDate: formattedDate(date),
        };
        // store in localStorage
        _localStorage.setItem(KEY, JSON.stringify(updatedStreak));

        return updatedStreak;
      }

      if (shouldReset) {
        const updatedStreak = buildStreak(date);
        // store in localStorage
        _localStorage.setItem(KEY, JSON.stringify(updatedStreak));

        return updatedStreak;
      }

      return streak;
    } catch (error) {
      console.error("Failed to parse streak from localStorage");
    }
  }

  const streak = buildStreak(date);

  // store in localStorage
  _localStorage.setItem(KEY, JSON.stringify(streak));

  return streak;
}
