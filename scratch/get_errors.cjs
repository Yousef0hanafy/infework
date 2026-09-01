const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const urls = [
    "http://localhost:8080/ar/contact",
    "http://localhost:8080/ar/contact?type=technical",
    "http://localhost:8080/en/contact",
  ];

  for (const url of urls) {
    console.log(`\nTesting URL: ${url}`);
    const page = await browser.newPage();
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 8000 });
      await new Promise((r) => setTimeout(r, 2000));
      const pageTitle = await page.title();
      const bodyText = await page.evaluate(() => document.body.innerText);
      const isErrorBoundary =
        bodyText.includes("تعذر تحميل هذه الصفحة") || bodyText.includes("Failed to Load Page");

      console.log(`- Title: "${pageTitle}"`);
      console.log(`- Has Error Boundary: ${isErrorBoundary}`);
      console.log(`- Errors logged: ${JSON.stringify(errors)}`);
    } catch (e) {
      console.error(`- Fetch failed: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  process.exit(0);
})();
