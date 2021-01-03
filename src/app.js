const express = require('express');

const { errorLogger } = require('./middlewares/logger');

const userRouter = require('./resources/user/user.router');
const profileRouter = require('./resources/profile/profile.router');
const wordRouter = require('./resources/word/word.router');
const handleNonExistentRoutes = require('./middlewares/handleNonExistentRoutes');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/api/', userRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/word', wordRouter);
app.use(handleNonExistentRoutes, errorLogger);

module.exports = app;
