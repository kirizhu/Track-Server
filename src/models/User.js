const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: string,
    unique: true,
    required: true,
  },
  password: {
    type: string,
    required: true,
  },
});

mongoose.model('User', userSchema);
