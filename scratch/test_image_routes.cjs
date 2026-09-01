const http = require("http");

const urls = [
  "http://localhost:8080/en",
  "http://localhost:8080/ar",
  "http://localhost:8080/en/work",
  "http://localhost:8080/ar/work",
  "http://localhost:8080/en/work/arish-water-supply",
  "http://localhost:8080/ar/work/arish-water-supply",
  "http://localhost:8080/en/work/sisi-city-wastewater",
  "http://localhost:8080/ar/work/sisi-city-wastewater",
  "http://localhost:8080/en/work/rafah-bedouin-housing",
  "http://localhost:8080/en/work/sadat-city-ro",
  "http://localhost:8080/en/work/toshka-pumping-stations",
  "http://localhost:8080/en/work/toshka-farm-potable-water-plant",
  "http://localhost:8080/en/work/abu-zaabal-landfill-environmental-works",
  "http://localhost:8080/images/projects/arish-water-supply/cover.webp",
  "http://localhost:8080/images/projects/arish-water-supply/gallery-1.webp",
  "http://localhost:8080/images/projects/sisi-city-wastewater/cover.webp",
  "http://localhost:8080/images/projects/sisi-city-wastewater/gallery-11.webp",
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({
            url,
            statusCode: res.statusCode,
            contentType: res.headers["content-type"],
            length: res.statusCode === 200 ? data.length : 0,
          });
        });
      })
      .on("error", (err) => {
        resolve({ url, error: err.message });
      });
  });
}

async function run() {
  console.log("Testing HTTP Endpoints and Image Delivery:\n");
  let failures = 0;
  for (const u of urls) {
    const res = await checkUrl(u);
    console.log(
      `${res.statusCode === 200 ? "✅" : "❌"} [${res.statusCode}] ${res.url} (${res.contentType || ""})`,
    );
    if (res.statusCode !== 200) failures++;
  }
  console.log(`\nCompleted with ${failures} failures.`);
}

run();
