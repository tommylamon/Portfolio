require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const scrapeData = require('./scraper');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quotesDB';

// MongoDB Schema
const quoteSchema = new mongoose.Schema({
  text: { type: String, unique: true },
  author: String
});
const Quote = mongoose.model('Quote', quoteSchema);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error ❌', err));

// Route: Scrape & save quotes
app.get('/scrape', async (req, res) => {
  const quotes = await scrapeData();

  for (const q of quotes) {
    await Quote.updateOne({ text: q.text }, q, { upsert: true });
  }

  res.json({ message: 'Scraping complete', count: quotes.length });
});

// Route: Get all quotes
app.get('/quotes', async (req, res) => {
  const quotes = await Quote.find({});
  res.json(quotes);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});