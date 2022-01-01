interface Streak {
  currentCount: number;
  startDate: string;
  lastLoginDate: string;
}

export function streakCounter(_localStorage: Storage, date: Date): Streak {
  return {
    currentCount: 0,
    startDate: "1/1/2022",
    lastLoginDate: "1/1/2022",
  };
}
