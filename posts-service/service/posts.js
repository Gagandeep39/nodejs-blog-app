/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 11:38:43
 * @modify date 2020-10-19 11:38:43
 * @desc Manage Posts related operations
 */
const axios = require('axios');
const { randomBytes } = require('crypto');
const posts = {};
const eventBusService = process.env.EVENT_BUS_SERVICE;

exports.fetchAllPosts = (req, res) => res.send(posts);

exports.createPost = (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  // Send data to event bus
  axios
    .post(`http://${eventBusService}:7000/events`, {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    })
    .then(() => res.status(201).send(posts[id]));
};

exports.sendEvent = (req, res) => {
  console.log(req.body.type);
  res.send({ status: 'OK' });
};
