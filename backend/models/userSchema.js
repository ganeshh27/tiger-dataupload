const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: 0,
  },
});

const User = mongoose.model('User', UserSchema);
