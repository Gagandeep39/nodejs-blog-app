/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 11:02:33
 * @modify date 2020-10-19 11:02:33
 * @desc Event-bus
 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const eventsService = require('./service/events');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.post('/events', eventsService.publishEvents);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Event-bus started on port ${PORT}`));
