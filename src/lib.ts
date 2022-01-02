export function formattedDate(date: Date): string {
  // NOTE@jsjoeio
  // sometimes this returns 11/11/2021
  // other times it returns 11/11/2021, 12:00:00 AM
  // which is why we call the .split at the end
  return date.toLocaleString("en-US").split(",")[0];
}
