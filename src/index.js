require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

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
