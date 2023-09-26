const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8001;

app.use(cors());

let stocks = [
    { name: 'TXC', Price: 125.50, info: 'TechX Corporation is a leading tech company specializing in software development and cloud computing solutions.' },
    { name: 'GEI', Price: 42.80, info: 'GEI is a pioneer in renewable energy solutions, focusing on solar and wind power projects.' },
    { name: 'GPL', Price: 75.20, info: 'GPL is a pharmaceutical giant known for its research and development of life-saving drugs.' },
    { name: 'LAG', Price: 240.75, info: 'LAG produces high-end luxury automobiles and is known for its cutting-edge designs.' },
];

function updateStockPrices() {
    stocks = stocks.map((stock) => ({
        ...stock,
        Price: Math.floor(Math.random() * 1000),
    }));
}

setInterval(updateStockPrices, 60000);

app.get('/', (req, res) => {
    res.json(stocks);
});

app.get('/stock/:name', (req, res) => {
    const stockName = req.params.name;
    const stock = stocks.find((s) => s.name === stockName);

    if (!stock) {
        res.status(404).json({ error: 'Stock not found' });
    } else {
        const updatedPrice = stock.price + Math.floor(Math.random() * 21 - 10);
        stock.price = updatedPrice;

        res.json({ name: stock.name, price: stock.price });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
