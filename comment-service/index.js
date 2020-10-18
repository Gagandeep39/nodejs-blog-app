/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-18 23:26:42
 * @modify date 2020-10-18 23:26:42
 * @desc Starting point of Comments microservice
 */
const express = require('express');
const app = express();
const posts = {};

app.get('/comments', (req, res) => res.send(posts));
app.post('/comments', (req, res) =>
  res.status(201).send('Comment created Successfully')
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Comments Service started on port ${PORT}`));
