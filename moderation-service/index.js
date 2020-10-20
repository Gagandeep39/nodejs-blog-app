/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 12:57:14
 * @modify date 2020-10-19 12:57:14
 * @desc Moderation Service
 */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
require('dotenv').config()
const moderationService = require('./service/moderate')

app.use(bodyParser.json());
app.use(morgan('dev'));
app.post('/events', moderationService.moderateComments)

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Moderation Service started on port ${PORT}`));
