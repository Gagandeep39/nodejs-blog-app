/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-18 23:26:42
 * @modify date 2020-10-18 23:26:42
 * @desc Starting point of Comments microservice
 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const commentsService = require('./service/comments');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/posts/:id/comments', commentsService.fetchCommentsByPostId);
app.post('/posts/:id/comments', commentsService.createComment);
app.post('/events', commentsService.sendEvent);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Comments Service started on port ${PORT}`));
