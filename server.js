// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const DataSchema = new mongoose.Schema({
    intensity: Number,
    likelihood: Number,
    relevance: Number,
    year: Number,
    country: String,
    topics: String,
    region: String,
    city: String,
    // Add other fields as necessary
}, { collection: 'yourCollection' });

const Data = mongoose.model('Data', DataSchema);

app.get('/data', async (req, res) => {
    const filters = req.query;
    const data = await Data.find(filters);
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
