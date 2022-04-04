require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mercadopago = require('mercadopago');
const { connect } = require('./database');

const port = process.env.PORT || 8000;
const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

app.post('/payments/create-preference', async (req, res) => {
  try {
    const { body } = req;

    const preferences = {
      ...body,
    };

    console.log(preferences)

    const { body: { id } } = await mercadopago.preferences.create(preferences);

    console.log(id)
    res.status(201).json({ preferenceId: id });
  } catch(e) {
    console.log(e)
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
