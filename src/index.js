require('./models/User');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = `mongodb+srv://kiribaty:${process.env.MONGOPASSWORD}@cluster0.eoapt.mongodb.net/Cluster0?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to Mongo instance', err);
});

app.get('/', (req, res) => {
  res.send('Hi there');
});

app.listen(3000, () => console.log('Listening on port 3000'));
