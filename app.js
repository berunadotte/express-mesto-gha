const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
require('dotenv').config();

const app = express();

const { PORT, DB_CONN } = process.env;

mongoose.connect(DB_CONN);

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64f8e7a76da61ffe6cec736b',
  };

  next();
});
app.use('/', userRouter);
app.use('/', cardRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному адресу не существует' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
