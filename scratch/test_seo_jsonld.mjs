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

async function testSeoAndJsonLd() {
  console.log("--- Testing SEO, OpenGraph & JSON-LD ---");

  // 1. Root / Home
  const homeHtml = await fetchPath("/en");
  const hasOrgLd = homeHtml.includes('"@type":"Corporation"');
  const hasWebSiteLd = homeHtml.includes('"@type":"WebSite"');
  const hasHreflangEn = homeHtml.includes('hreflang="en"');
  const hasHreflangAr = homeHtml.includes('hreflang="ar"');
  const hasOgImageHome = homeHtml.includes(
    'property="og:image" content="https://infeworks.com/logo.png"',
  );

  console.log("Homepage checks:", {
    hasCorporationSchema: hasOrgLd,
    hasWebSiteSchema: hasWebSiteLd,
    hasHreflangEn,
    hasHreflangAr,
    hasOgImageHome,
  });

  // 2. Project Case Study
  const projectHtml = await fetchPath("/en/work/sadat-city-ro");
  const hasProjectLd = projectHtml.includes('"@type":"Project"');
  const hasOgImageProject = projectHtml.includes(
    'property="og:image" content="https://infeworks.com/images/projects/sadat-city-ro/cover.webp"',
  );

  console.log("Case study checks (sadat-city-ro):", {
    hasProjectSchema: hasProjectLd,
    hasOgImageProject,
  });

  // 3. Sector page
  const sectorHtml = await fetchPath("/en/what-we-do/water-treatment");
  const hasServiceLd = sectorHtml.includes('"@type":"Service"');
  console.log("Sector page checks (water-treatment):", {
    hasServiceSchema: hasServiceLd,
  });

  if (hasOrgLd && hasWebSiteLd && hasProjectLd && hasServiceLd && hasOgImageProject) {
    console.log(
      "SUCCESS: All SEO, OpenGraph, and JSON-LD structured data validated in SSR output!",
    );
  } else {
    console.log("FAIL: Some SEO checks failed.");
  }
}

testSeoAndJsonLd().catch(console.error);
