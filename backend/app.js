const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const appRouter = require('./routes');
const errorHandler = require('./middlewares/error-handler');

mongoose.connect('mongodb://localhost:27017/mestodb').then(() => {
  // eslint-disable-next-line no-console
  console.log('DB connected');
});
const app = express();
const {
  PORT = 3000,
} = process.env;
const { checkServer } = require('./utils/responseCheck');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(requestLogger);
app.use(appRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  checkServer(PORT);
});
