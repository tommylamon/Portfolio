const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeData() {
    try {
        let results = [];
        let page = 1;
        let hasNext = true;

        while (hasNext) {
            const { data } = await axios.get(`http://quotes.toscrape.com/page/${page}/`);
            const $ = cheerio.load(data);

            const quotes = $('.quote');
            if (quotes.length === 0) {
                hasNext = false; // no more quotes, stop loop
                break;
            }

            quotes.each((i, el) => {
                const text = $(el).find('.text').text();
                const author = $(el).find('.author').text();
                results.push({ text, author });
            });

            page++; // go to next page
        }

        console.log(`✅ Scraped ${results.length} quotes from all pages`);
        return results;

    } catch (error) {
        console.error('❌ Scraper error:', error.message);
        return [];
    }
}

module.exports = scrapeData;