import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import colors from "../../themes/colors_visitors.js";

const username = process.env.GITHUB_ACTOR;
const token = process.env.ACCESS_TOKEN;

if (!token) {
  console.error("❌ ACCESS_TOKEN missing");
  process.exit(1);
}

const REST_API = "https://api.github.com";

// ✅ fetch with timeout
async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ✅ LIMIT repos (CRITICAL)
async function getRepos() {
  const res = await fetchWithTimeout(
    `${REST_API}/users/${username}/repos?per_page=20`
  );

  return res ? res.map((r) => r.name) : [];
}

// ✅ only top few repos
async function getRepoViews(repos) {
  const results = [];

  for (const repo of repos.slice(0, 5)) {
    const data = await fetchWithTimeout(
      `${REST_API}/repos/${username}/${repo}/traffic/views`
    );

    if (data && data.uniques) {
      results.push({
        name: repo,
        uniques: data.uniques,
        dateRange: "Last 14 days",
      });
    }
  }

  return results.sort((a, b) => b.uniques - a.uniques);
}

async function main() {
  try {
    console.log("👀 Fetching visitor stats...");

    const repos = await getRepos();
    const repoStats = await getRepoViews(repos);

    const templatePath = path.resolve(
      path.dirname(new URL(import.meta.url).pathname),
      "..",
      "templates",
      "template_visitors.hbs"
    );

    const template = Handlebars.compile(
      fs.readFileSync(templatePath, "utf8")
    );

    const data = {
      ...colors.light,
      ...Object.fromEntries(
        Object.entries(colors.dark).map(([k, v]) => [k + "Dark", v])
      ),
      repos: repoStats,
      rowHeight: repoStats.length ? 100 / repoStats.length : 0,
    };

    const svg = template(data);

    const outputDir = path.resolve(
      path.dirname(new URL(import.meta.url).pathname),
      "..",
      "..",
      "output"
    );

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outputDir, "stats_visitors.svg"), svg);

    console.log("✅ visitors SVG generated");
  } catch (err) {
    console.error("❌ Visitors error:", err.message);
  }
}

main();