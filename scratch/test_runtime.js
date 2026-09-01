import http from "http";

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
      })
      .on("error", reject);
  });
}

async function main() {
  console.log("--- Testing /en/work ---");
  const workRes = await fetchUrl("http://localhost:8081/en/work");
  const cardRegex = /href="\/en\/work\/([^"]+)"/g;
  const matches = [];
  let m;
  while ((m = cardRegex.exec(workRes.body)) !== null) {
    matches.push(m[1]);
  }
  const uniqueSlugs = Array.from(new Set(matches));
  console.log(`Rendered project cards on /en/work: ${uniqueSlugs.length}`);
  console.log("Sample slugs:", uniqueSlugs.slice(0, 15));

  console.log("\n--- Testing /en (Homepage) ---");
  const homeRes = await fetchUrl("http://localhost:8081/en");
  const homeMatches = [];
  while ((m = cardRegex.exec(homeRes.body)) !== null) {
    homeMatches.push(m[1]);
  }
  console.log(`Rendered project links on /en: ${Array.from(new Set(homeMatches)).length}`);
  console.log("Home slugs:", Array.from(new Set(homeMatches)));
}

main().catch(console.error);
