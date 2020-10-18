/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-18 23:26:42
 * @modify date 2020-10-18 23:26:42
 * @desc Starting point of Comments microservice
 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { randomBytes } = require('crypto');
const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/posts/:id/comments', (req, res) =>
  res.send(commentsByPostId[req.params.id])
);
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Comments Service started on port ${PORT}`));
