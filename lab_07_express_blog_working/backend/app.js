const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const categoryRouter = require('./routes/category');
const commentRouter = require('./routes/comment');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/category', categoryRouter);
app.use('/comment', commentRouter);

module.exports = app;
