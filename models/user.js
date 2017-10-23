const mongoose = require('mongoose');

// user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  googleID: {
    type: String,
    unique: true
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// user model
const User = mongoose.model('users', UserSchema);
module.exports = User;
