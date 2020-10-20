/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 11:42:58
 * @modify date 2020-10-19 11:42:58
 * @desc Manage Events
 */
const axios = require('axios');
const events = [];
const postsService = process.env.POSTS_SERVICE;
const commentService = process.env.COMMENT_SERVICE;
const moderationService = process.env.MODERATION_SERVICE;
const queryService = process.env.QUERY_SERVICE;

exports.publishEvents = (req, res) => {
  const event = req.body;
  events.push(event);

  // Send events to all services
  axios.post(`http://${postsService}:4000/events`, event);
  axios.post(`http://${commentService}:5000/events`, event);
  axios.post(`http://${moderationService}:9000/events`, event);
  axios.post(`http://${queryService}:8000/events`, event);

  res.send({ status: 'OK' });
};

/**
 * Fetches all events
 */
exports.fetchAllEvents = (req, res) => res.send(events);
