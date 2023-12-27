require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];
// const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const appRouter = require('./routes');
const errorHandler = require('./middlewares/error-handler');

const { PORT, MONGO_URL } = process.env;
mongoose.connect(MONGO_URL).then(() => {
  // eslint-disable-next-line no-console
  console.log('DB connected');
});
const app = express();
const { checkServer } = require('./utils/responseCheck');

app.use(express.json());
app.use(function (req, res, next) {
  const { origin } = req.headers; /
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(requestLogger);
app.use('/api/', appRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  checkServer(PORT);
});
