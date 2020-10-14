require('./models/User');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = `mongodb+srv://kiribaty:${process.env.MONGO_PASSWORD}@cluster0.eoapt.mongodb.net/Cluster0?retryWrites=true&w=majority`;
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

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email is:${req.user.email}`);
});

app.listen(3000, () => console.log('Listening on port 3000'));
