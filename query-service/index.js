/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 11:46:58
 * @modify date 2020-10-19 11:46:58
 * @desc Queru service
 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const queryService = require('./service/query');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/posts', queryService.fetchPostsAndComments);
app.post('/events', queryService.recieveEvents);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Query Service started on port ${PORT}`);
  queryService.processPreviousEvents();
});
