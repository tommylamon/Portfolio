import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
app.use(cors());

// Example scrape route
app.get("/scrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Needed for Render
    });
    const page = await browser.newPage();
    await page.goto("http://quotes.toscrape.com");

    const quotes = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".quote")).map(quote => ({
        text: quote.querySelector(".text")?.innerText,
        author: quote.querySelector(".author")?.innerText,
      }))
    );

    await browser.close();
    res.json(quotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed" });
  }
});

// Render gives you a PORT environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));