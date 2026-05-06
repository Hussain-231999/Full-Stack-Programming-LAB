const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connect_db = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connect_db();

app.use('/api/products', require('./routes/product_routes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});