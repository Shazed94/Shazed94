import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import colors from "../../themes/colors_commits.js";

const username = process.env.GITHUB_ACTOR;
const token = process.env.ACCESS_TOKEN;
const GRAPHQL_API = "https://api.github.com/graphql";

if (!token) {
  console.error("❌ ACCESS_TOKEN is missing");
  process.exit(1);
}

// ✅ fetch with timeout (prevents hanging)
async function fetchFromGitHub(query, variables = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s

  try {
    const res = await fetch(GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ GitHub API Error:", text);
      throw new Error("GitHub API failed");
    }

    const data = await res.json();
    if (data.errors) {
      console.error("❌ GraphQL Errors:", JSON.stringify(data.errors, null, 2));
      throw new Error("GraphQL error");
    }

    return data.data;
  } catch (err) {
    console.error("❌ Fetch failed:", err.message);
    throw err;
  }
}

// ✅ fetch contributions (single range instead of loop)
async function fetchContributions(fromDate, toDate) {
  console.log(`📊 Fetching contributions from ${fromDate} → ${toDate}`);

  const query = `
    query ($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    username,
    from: fromDate.toISOString(),
    to: toDate.toISOString(),
  };

  const data = await fetchFromGitHub(query, variables);
  return data.user.contributionsCollection.contributionCalendar;
}

// ✅ streak calculation (unchanged logic, cleaned)
function calculateStreaks(days) {
  days.sort((a, b) => new Date(a.date) - new Date(b.date));

  let longest = 0;
  let current = 0;
  let lastDate = null;

  let longestStart = null;
  let longestEnd = null;
  let currentStart = null;

  const today = new Date().toISOString().split("T")[0];

  for (const { date, contributionCount } of days) {
    if (date > today) continue;

    if (contributionCount > 0) {
      if (!lastDate) {
        current = 1;
        currentStart = date;
      } else {
        const diff =
          (new Date(date) - new Date(lastDate)) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
          current++;
        } else {
          current = 1;
          currentStart = date;
        }
      }

      if (current > longest) {
        longest = current;
        longestStart = currentStart;
        longestEnd = date;
      }

      lastDate = date;
    }
  }

  const isActive = lastDate === today;

  return {
    currentStreak: isActive ? current : 0,
    currentStreakStart: isActive ? currentStart : null,
    longestStreak: longest,
    longestStreakStart: longestStart,
    longestStreakEnd: longestEnd,
  };
}

function formatDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// 🚀 MAIN
async function generateSVG() {
  try {
    const now = new Date();

    // ✅ LIMIT TO LAST 1 YEAR (FAST)
    const fromDate = new Date();
    fromDate.setFullYear(now.getFullYear() - 1);

    const contributions = await fetchContributions(fromDate, now);

    const allDays = contributions.weeks.flatMap((w) => w.contributionDays);

    const {
      currentStreak,
      longestStreak,
      currentStreakStart,
      longestStreakStart,
      longestStreakEnd,
    } = calculateStreaks(allDays);

    const commitDateRange = `${formatDate(fromDate)} - ${formatDate(now)}`;

    const longestStreakDates =
      longestStreak > 0
        ? `${formatDate(longestStreakStart)} - ${formatDate(
            longestStreakEnd
          )}`
        : "N/A";

    const currentStreakDateRange =
      currentStreak > 0
        ? `${formatDate(currentStreakStart)} - ${formatDate(now)}`
        : "N/A";

    const timeZone = colors.meta?.timeZone || "UTC";

    const lastUpdate =
      timeZone !== "none"
        ? new Date()
            .toLocaleString("en", {
              timeZone,
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(",", "")
        : "";

    const templateData = {
      ...colors.light,
      ...Object.fromEntries(
        Object.entries(colors.dark).map(([k, v]) => [k + "Dark", v])
      ),
      totalContributions: contributions.totalContributions,
      commitDateRange,
      currentStreak,
      currentStreakDateRange,
      longestStreak,
      longestStreakDateRange: longestStreakDates,
      lastUpdate,
    };

    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    const templatePath = path.resolve(
      __dirname,
      "..",
      "templates",
      "template_commits.hbs"
    );

    const svgContent = Handlebars.compile(
      fs.readFileSync(templatePath, "utf8")
    )(templateData);

    const outputDir = path.resolve(__dirname, "..", "..", "output");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, "stats_commits.svg");

    fs.writeFileSync(outputPath, svgContent);

    console.log(`✅ SVG generated: ${outputPath}`);
  } catch (err) {
    console.error("❌ Failed to generate SVG:", err.message);
    process.exit(1);
  }
}

generateSVG();