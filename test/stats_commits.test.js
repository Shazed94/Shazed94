import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("generates a card for the configured user with yesterday's active streak", async (t) => {
  const oldToken = process.env.ACCESS_TOKEN;
  const oldUsername = process.env.GITHUB_USERNAME;
  const oldActor = process.env.GITHUB_ACTOR;
  process.env.ACCESS_TOKEN = "test-token";
  process.env.GITHUB_USERNAME = "profile-owner";
  process.env.GITHUB_ACTOR = "workflow-runner";

  t.after(() => {
    for (const [key, value] of Object.entries({
      ACCESS_TOKEN: oldToken,
      GITHUB_USERNAME: oldUsername,
      GITHUB_ACTOR: oldActor,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.parse(today) - 86400000)
    .toISOString().slice(0, 10);
  const previousDay = new Date(Date.parse(today) - 2 * 86400000)
    .toISOString().slice(0, 10);
  let variables;
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    variables = JSON.parse(options.body).variables;
    return {
      ok: true,
      json: async () => ({
        data: {
          user: {
            contributionsCollection: {
              contributionCalendar: {
                totalContributions: 2,
                weeks: [{
                  contributionDays: [
                    { date: previousDay, contributionCount: 1 },
                    { date: yesterday, contributionCount: 1 },
                    { date: today, contributionCount: 0 },
                  ],
                }],
              },
            },
          },
        },
      }),
    };
  });

  let resolveWrite;
  const written = new Promise((resolve) => { resolveWrite = resolve; });
  t.mock.method(fs, "writeFileSync", (filename, svg) => resolveWrite({ filename, svg }));

  await import("../src/generators/stats_commits.js");
  const { filename, svg } = await written;
  const format = (date) => new Date(date).toLocaleDateString("en", {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
  });
  assert.equal(variables.username, "profile-owner");
  assert.match(filename, /stats_commits\.svg$/);
  assert.match(svg, /class="stat streak"[^>]*>2<\/text>/);
  assert.ok(svg.includes(`${format(previousDay)} - ${format(yesterday)}`));
});
