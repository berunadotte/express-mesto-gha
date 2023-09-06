const express = require('express');

const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64f8e7a76da61ffe6cec736b',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
