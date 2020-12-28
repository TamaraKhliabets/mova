const express = require('express');
const mongoose = require('mongoose');

const { PORT, MONGO_DB_CONNECTION_URL } = require('./config');

const userRouter = require('./resources/user/user.router');

const app = express();

app.use(express.json());
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/users', userRouter);

const connectDb = () => {
  mongoose.connect(MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', (err) => {
    console.log('err', err);
  });
  db.once('connected', () => {
    console.log('mongoose is connected');
  });
};

try {
  connectDb();
  app.listen(PORT, () => {
    console.log(`app is listening to PORT ${PORT}`);
  });
} catch (err) {
  console.log(err.message);
}
