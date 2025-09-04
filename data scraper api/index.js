require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI); // ← must be first

const express = require('express');
const mongoose = require('mongoose');
const scrapeData = require('./scraper');
const Data = require('./models/Data');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Route to scrape and return headlines
app.get('/headlines', async (req, res) => {
    try {
        // Scrape the data
        const headlines = await scrapeData();

        // Store in MongoDB
        await Data.create({ content: headlines });

        // Respond with JSON
        res.json({ success: true, data: headlines });
    } catch (err) {
        console.error('❌ Error scraping:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
