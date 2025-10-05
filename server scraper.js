import express from "express";  
import cors from "cors";
import scraper from "./scraper.js"; // make sure this file exports a function

const app = express();
app.use(cors());

// ✅ Root route (for Render / homepage)
app.get("/", (req, res) => {
  res.send("✅ Data Scraper API is running! Use /scrape to fetch data.");
});

// ✅ Actual scraper route
app.get("/scrape", async (req, res) => {
  try {
    const data = await scraper();
    res.json(data);
  } catch (err) {
    console.error("Scraping failed:", err);
    res.status(500).json({ error: "Scraping failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));