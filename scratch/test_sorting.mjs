import http from "http";

http
  .get("http://localhost:8081/en", (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      const slugs = [...data.matchAll(/\/en\/work\/([\w-]+)/g)].map((m) => m[1]);
      const uniqueSlugs = [...new Set(slugs)];
      console.log("Found project slugs on /en:", uniqueSlugs.slice(0, 10));

      const flagships = [
        "sadat-city-ro",
        "toshka-pumping-stations",
        "food-city-treatment",
        "arish-water-supply",
      ];
      const matches = flagships.every((f, i) => uniqueSlugs[i] === f);

      if (matches) {
        console.log("SUCCESS: Homepage featured projects are the correct flagships in order.");
      } else {
        console.log("FAIL: Homepage featured projects do not match expected flagships.");
      }
    });
  })
  .on("error", (err) => console.log("Fetch error:", err.message));
