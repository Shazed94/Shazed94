import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import colors from "../../themes/colors_general.js";

const username = process.env.GITHUB_ACTOR;
const token = process.env.ACCESS_TOKEN;

if (!token) {
  console.error("❌ ACCESS_TOKEN missing");
  process.exit(1);
}

const GRAPHQL_API = "https://api.github.com/graphql";

// ✅ fetch with timeout
async function fetchFromGitHub(query) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("GitHub API failed");

    const data = await res.json();
    if (data.errors) throw new Error("GraphQL error");

    return data.data;
  } catch (err) {
    console.error("❌ Fetch failed:", err.message);
    throw err;
  }
}

async function main() {
  try {
    console.log("📊 Fetching general stats...");

    const query = `
      query {
        user(login: "${username}") {
          name
          repositories(first: 100) {
            totalCount
            nodes {
              stargazers { totalCount }
              forkCount
            }
          }
          contributionsCollection {
            totalCommitContributions
          }
        }
      }
    `;

    const data = await fetchFromGitHub(query);
    const user = data.user;

    const stars = user.repositories.nodes.reduce(
      (sum, repo) => sum + repo.stargazers.totalCount,
      0
    );

    const forks = user.repositories.nodes.reduce(
      (sum, repo) => sum + repo.forkCount,
      0
    );

    const stats = {
      name: user.name || username,
      stars,
      forks,
      contributions: user.contributionsCollection.totalCommitContributions,
      repos: user.repositories.totalCount,
      linesChanged: "N/A", // removed heavy calc
      views: "N/A", // removed heavy calc
    };

    const templateData = {
      ...colors.light,
      ...Object.fromEntries(
        Object.entries(colors.dark).map(([k, v]) => [k + "Dark", v])
      ),
      ...stats,
    };

    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    const templatePath = path.resolve(
      __dirname,
      "..",
      "templates",
      "template_general.hbs"
    );

    const svg = Handlebars.compile(
      fs.readFileSync(templatePath, "utf8")
    )(templateData);

    const outputDir = path.resolve(__dirname, "..", "..", "output");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, "stats_general.svg");
    fs.writeFileSync(outputPath, svg);

    console.log("✅ stats_general.svg generated");
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

main();