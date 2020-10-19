/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 11:33:13
 * @modify date 2020-10-19 11:33:13
 * @desc Operations
 */
const axios = require('axios');
const { randomBytes } = require('crypto');
const commentsByPostId = {};

exports.fetchCommentsByPostId = (req, res) => {
  res.send(commentsByPostId[req.params.id]);
};

exports.createComment = (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  // Send data to event bus
  axios
    .post('http://localhost:7000/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId: req.params.id,
      },
    })
    .then(() => res.status(201).send(comments));
};

exports.sendEvent = (req, res) => {
  console.log(req.body.type);
  res.send({ status: 'OK' });
};
