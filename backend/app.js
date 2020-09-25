require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const articlesRouter = require('./routes/articlesRouter');
const usersRouter = require('./routes/usersRouter');

app.use(express.json());

app.use('/articles', articlesRouter);
app.use('/users', usersRouter);

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected!')
}).on('error', (error) => {
  console.log('MongoDB connection error', error);
});

app.get('/', (req,res) => {
  res.send("Hello ...");
})

app.listen(port, (err) => {
  if(err) {
    console.log(err, "Not connected!")
  } else {
    console.log(`Listening on port ${port}...`);
  }
});