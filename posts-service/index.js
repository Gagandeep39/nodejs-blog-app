/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-18 23:19:34
 * @modify date 2020-10-18 23:19:34
 * @desc Starting point of Posts microservice
 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const postsService = require('./service/posts');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/posts', postsService.fetchAllPosts);
app.post('/posts', postsService.createPost);
app.post('/events', postsService.sendEvent);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Posts Service started on port ${PORT} - v2`));
