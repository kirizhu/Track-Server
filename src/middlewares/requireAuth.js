const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.1' });
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.2' });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
