const express = require('express');
const cors = require('cors');
const scrapeData = require('../data scraper api/scraper'); // adjust path

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => res.send('Server is running 🚀'));

app.get('/scrape', async (req, res) => {
  try {
    const quotes = await scrapeData();
    res.json(quotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to scrape data" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));