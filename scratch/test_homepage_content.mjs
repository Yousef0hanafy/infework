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

async function verifyHomepageContent() {
  console.log("--- Testing Homepage Content & Slogans ---");

  // 1. English Homepage
  const enHtml = await fetchPath("/en");
  const hasEnSlogan = enHtml.includes("One partner · Full scope · Delivered as agreed.");
  const hasEnBenchmark = enHtml.includes("Sadat City RO Plant (1,500 m³/day)");
  const hasEnScrollAnchor = enHtml.includes('href="#clients-section"');
  const hasEnSectionE = enHtml.includes("Integrated Execution Model");

  console.log("EN Homepage Verification:", {
    hasEnSlogan,
    hasEnBenchmark,
    hasEnScrollAnchor,
    hasEnSectionE,
  });

  // 2. Arabic Homepage
  const arHtml = await fetchPath("/ar");
  const hasArSlogan = arHtml.includes("شريك واحد · مسؤولية شاملة · تسليم بالمعايير المتفق عليها.");
  const hasArBenchmark = arHtml.includes("محطة تحلية السادات (1,500 م³/يوم)");
  const hasArSectionE = arHtml.includes("نموذج التنفيذ المتكامل");

  console.log("AR Homepage Verification:", {
    hasArSlogan,
    hasArBenchmark,
    hasArSectionE,
  });

  if (
    hasEnSlogan &&
    hasArSlogan &&
    hasEnBenchmark &&
    hasArBenchmark &&
    hasEnScrollAnchor &&
    hasEnSectionE
  ) {
    console.log(
      "SUCCESS: All Homepage enhancements, benchmarks, and corporate commitments verified in SSR output!",
    );
  } else {
    console.log("FAIL: Some checks failed.");
  }
}

verifyHomepageContent().catch(console.error);
