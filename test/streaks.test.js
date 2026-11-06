import test from "node:test";
import assert from "node:assert/strict";
import { calculateStreaks } from "../src/generators/streaks.js";

const now = new Date("2026-11-06T18:18:00Z");
const day = (date, contributionCount = 1) => ({ date, contributionCount });

test("counts an active streak ending today, regardless of input order", () => {
  const days = [day("2026-11-06"), day("2026-11-04"), day("2026-11-05")];
  assert.deepEqual(calculateStreaks(days, now), {
    currentStreak: 3,
    currentStreakStart: "2026-11-04",
    currentStreakEnd: "2026-11-06",
    longestStreak: 3,
    longestStreakStart: "2026-11-04",
    longestStreakEnd: "2026-11-06",
  });
  assert.equal(days[0].date, "2026-11-06");
});

test("keeps yesterday's streak active when today has no contributions", () => {
  const result = calculateStreaks([
    day("2026-11-04"),
    day("2026-11-05"),
    day("2026-11-06", 0),
  ], now);
  assert.equal(result.currentStreak, 2);
  assert.equal(result.currentStreakStart, "2026-11-04");
  assert.equal(result.currentStreakEnd, "2026-11-05");
});

test("expires a streak after a full missed day and retains the longest streak", () => {
  const result = calculateStreaks([
    day("2026-11-02"),
    day("2026-11-03"),
    day("2026-11-04"),
    day("2026-11-05", 0),
    day("2026-11-06", 0),
  ], now);
  assert.equal(result.currentStreak, 0);
  assert.equal(result.currentStreakStart, null);
  assert.equal(result.currentStreakEnd, null);
  assert.equal(result.longestStreak, 3);
  assert.equal(result.longestStreakStart, "2026-11-02");
  assert.equal(result.longestStreakEnd, "2026-11-04");
});

test("breaks streaks at missing days and ignores future contributions", () => {
  const result = calculateStreaks([
    day("2026-11-01"),
    day("2026-11-02"),
    day("2026-11-05"),
    day("2026-11-07"),
    day("2026-11-08"),
    day("2026-11-09"),
  ], now);
  assert.equal(result.currentStreak, 1);
  assert.equal(result.currentStreakEnd, "2026-11-05");
  assert.equal(result.longestStreak, 2);
});

test("handles UTC year boundaries and empty calendars", () => {
  const boundary = new Date("2027-01-01T00:01:00Z");
  const result = calculateStreaks([day("2026-12-31")], boundary);
  assert.equal(result.currentStreak, 1);
  assert.equal(result.currentStreakEnd, "2026-12-31");
  assert.deepEqual(calculateStreaks([], boundary), {
    currentStreak: 0,
    currentStreakStart: null,
    currentStreakEnd: null,
    longestStreak: 0,
    longestStreakStart: null,
    longestStreakEnd: null,
  });
});
