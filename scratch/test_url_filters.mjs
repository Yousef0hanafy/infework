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

async function testUrlFilters() {
  console.log("--- Testing URL Search Params on /work ---");

  // 1. Fetch default /en/work
  const allHtml = await fetchPath("/en/work");
  const allSlugs = [...new Set([...allHtml.matchAll(/\/en\/work\/([\w-]+)/g)].map((m) => m[1]))];
  console.log(`Default /en/work returned ${allSlugs.length} projects:`, allSlugs.slice(0, 5));

  // 2. Fetch /en/work?sector=water-treatment
  const wtHtml = await fetchPath("/en/work?sector=water-treatment");
  const wtSlugs = [...new Set([...wtHtml.matchAll(/\/en\/work\/([\w-]+)/g)].map((m) => m[1]))];
  console.log(
    `Filtered /en/work?sector=water-treatment returned ${wtSlugs.length} projects:`,
    wtSlugs,
  );

  // 3. Fetch /en/work?sector=pumping-wells
  const pwHtml = await fetchPath("/en/work?sector=pumping-wells");
  const pwSlugs = [...new Set([...pwHtml.matchAll(/\/en\/work\/([\w-]+)/g)].map((m) => m[1]))];
  console.log(
    `Filtered /en/work?sector=pumping-wells returned ${pwSlugs.length} projects:`,
    pwSlugs,
  );

  // Assertions
  if (wtSlugs.length > 0 && wtSlugs.length < allSlugs.length && wtSlugs.includes("sadat-city-ro")) {
    console.log("SUCCESS: URL search parameter filtering is functioning cleanly in SSR!");
  } else {
    console.log("CHECK: Filtering results did not match expectations.");
  }
}

testUrlFilters().catch(console.error);
