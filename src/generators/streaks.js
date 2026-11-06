const DAY_MS = 24 * 60 * 60 * 1000;

export function calculateStreaks(days, now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  const yesterday = new Date(
    Date.parse(`${today}T00:00:00Z`) - DAY_MS
  ).toISOString().slice(0, 10);

  let longest = 0;
  let current = 0;
  let lastDate = null;
  let longestStart = null;
  let longestEnd = null;
  let currentStart = null;

  for (const { date, contributionCount } of [...days].sort((a, b) =>
    a.date.localeCompare(b.date)
  )) {
    if (date > today || contributionCount <= 0) continue;

    if (lastDate && Date.parse(date) - Date.parse(lastDate) === DAY_MS) {
      current++;
    } else {
      current = 1;
      currentStart = date;
    }

    if (current > longest) {
      longest = current;
      longestStart = currentStart;
      longestEnd = date;
    }

    lastDate = date;
  }

  const isActive = lastDate === today || lastDate === yesterday;

  return {
    currentStreak: isActive ? current : 0,
    currentStreakStart: isActive ? currentStart : null,
    currentStreakEnd: isActive ? lastDate : null,
    longestStreak: longest,
    longestStreakStart: longestStart,
    longestStreakEnd: longestEnd,
  };
}
