/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 11:42:58
 * @modify date 2020-10-19 11:42:58
 * @desc Manage Events
 */
const axios = require('axios');

exports.publishEvents = (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:5000/events', event);
  axios.post('http://localhost:8000/events', event);

  res.send({ status: 'OK' });
};
