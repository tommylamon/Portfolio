const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    text: String,           // the actual quote
    author: String,         // who said it
    createdAt: {
        type: Date,
        default: Date.now  // automatically store when it was added
    }
});

module.exports = mongoose.model('Data', DataSchema);

