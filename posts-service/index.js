/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-18 23:19:34
 * @modify date 2020-10-18 23:19:34
 * @desc Starting point of Posts microservice
 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');
const app = express();
const { randomBytes } = require('crypto');
const posts = {};

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/posts', (req, res) => res.send(posts));
app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  // Send data to event bus
  axios
    .post('http://localhost:7000/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    })
    .then(() => res.status(201).send(posts[id]));
});
app.post('/events', (req, res) => {
  console.log(req.body.type);
  res.send({ status: 'OK' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Posts Service started on port ${PORT}`));
