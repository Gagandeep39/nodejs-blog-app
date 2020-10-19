/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 11:02:33
 * @modify date 2020-10-19 11:02:33
 * @desc Event-bus
 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:5000/events', event);
  // axios.post('http://localhost:6000/events', event);

  res.send({ status: 'OK' });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Event-bus started on port ${PORT}`));
