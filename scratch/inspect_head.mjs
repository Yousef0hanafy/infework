import http from "http";

function fetchPath(path) {
  return new Promise((resolve, reject) => {
    http
      .get(`http://localhost:8081${path}`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

async function inspectHead() {
  const home = await fetchPath("/en");
  console.log("=== /en HEAD SNIPPET ===");
  const headMatch = home.match(/<head>([\s\S]*?)<\/head>/);
  if (headMatch) console.log(headMatch[1].slice(0, 1000));

  const project = await fetchPath("/en/work/sadat-city-ro");
  console.log("=== /en/work/sadat-city-ro HEAD OG TAGS ===");
  const ogMatches = [...project.matchAll(/<meta[^>]*property="og:[^>]*>/g)].map((m) => m[0]);
  console.log(ogMatches);
}

inspectHead().catch(console.error);
