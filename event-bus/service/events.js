/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 11:42:58
 * @modify date 2020-10-19 11:42:58
 * @desc Manage Events
 */
const axios = require('axios');
const events = [];

exports.publishEvents = (req, res) => {
  const event = req.body;
  events.push(event);

  // Send events to all services
  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:5000/events', event);
  axios.post('http://localhost:8000/events', event);
  axios.post('http://localhost:9000/events', event);

  res.send({ status: 'OK' });
};

/**
 * Fetches all events 
 */
exports.fetchAllEvents = (req, res) => res.send(events);
