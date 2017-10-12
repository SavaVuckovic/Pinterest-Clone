const mongoose = require('mongoose');

// pin schema
const PinSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'public'
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  comments: [{
    commentBody: {
      type: String,
      required: true
    },
    commentDate: {
      type: Date,
      default: Date.now
    },
    commentAuthor: {
      // related to users from another collection
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

// pin model
const Pin = mongoose.model('pins', PinSchema);
module.exports = Pin;