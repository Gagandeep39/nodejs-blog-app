/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 11:45:38
 * @modify date 2020-10-19 11:45:38
 * @desc Manage Queries
 */
const axios = require('axios');
const posts = {};
const eventBusService = process.env.EVENT_BUS_SERVICE;

/**
 *
 * @description Fetches all Posts and Comments associated with it
 */
exports.fetchPostsAndComments = (req, res) => res.send(posts);

/**
 * @description Recieves an event with new posts, it then Maps and stores all posts and comments in memory
 */
exports.recieveEvents = (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({ status: 'OK' });
};

const handleEvent = (type, data) => {
  switch (type) {
    case 'PostCreated':
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    case 'CommentCreated':
      const { id: commentId, content, postId, status } = data;
      const post = posts[postId];
      post.comments.push({ id: commentId, content, status });
      break;
    case 'CommentUpdated':
      const {
        id: updatedId,
        postId: updatedPostId,
        status: updatedStatus,
      } = data;
      const oldPost = posts[updatedPostId];
      const oldComment = oldPost.comments.find((c) => c.id === updatedId);
      oldComment.status = updatedStatus;
      break;
  }
};

exports.processPreviousEvents = () => {
  console.log('Processing previous events');
  axios
    .get(`http://${eventBusService}:7000/events`)
    .then((response) => {
      response.data.forEach((event) => {
        console.log(event.type);
        handleEvent(event.type, event.data);
      });
    })
    .catch((error) => console.log(error));
};
