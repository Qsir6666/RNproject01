const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const schedulesRouter = require('./routes/schedules');

const app = express();

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS 配置
app.use(cors());

// 路由
app.use('/', indexRouter);
app.use('/schedules', schedulesRouter);

// 测试路由
app.get('/test', (req, res) => {
  res.json({ message: 'API服务正常运行' });
});

// 404错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;
