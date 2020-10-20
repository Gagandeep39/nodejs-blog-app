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
const eventBusService = process.env.EVENT_BUS_SERVICE;

exports.fetchCommentsByPostId = (req, res) => {
  res.send(commentsByPostId[req.params.id]);
};

exports.createComment = (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[req.params.id] = comments;
  // Send data to event bus
  axios
    .post(`http://${eventBusService}:7000/events`, {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: 'pending',
      },
    })
    .then(() => res.status(201).send(comments));
};

exports.sendEvent = (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case 'CommentModerated':
      const { id, postId, status, content } = data;
      const comments = commentsByPostId[postId];
      const comment = comments.find((c) => c.id === id);
      comment.status = status;
      axios
        .post(`http://${eventBusService}:7000/events`, {
          type: 'CommentUpdated',
          data: {
            id,
            status,
            postId,
            content,
          },
        })
        .then(() => res.send({ status: 'OK' }));
      break;
  }
};
