const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');

const { handleGenericErrors } = require('./errors/genericErrors');

const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

const app = express();

app.use(bodyParser.json());

connectDB();

app.use(cors({
    origin: "https://e-commerce-client-seven-zeta.vercel.app",
    credentials: true,
    methods: ['get','post','delete','put','option']
}));

app.use('/auth', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.all('*', (req, res) => {
    res.status(400).json({ message: 'End point does not exist.' });
});

app.use(handleGenericErrors);

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server running at " + process.env.SERVER_URL);
})