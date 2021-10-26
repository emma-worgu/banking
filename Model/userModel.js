const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModel = new Schema({
  name: String,
  email: String,
  password: String,
  isClient: Boolean,
  accountBalance: {
    type: Number,
    default: 0,
  },
  accountNumber: String,
  phoneNumber: String,
  address: {
    houseAddress: String,
    city: String,
    state: String,
  },
  isLinked: {
    type: Boolean,
    default: false,
  },
  pin: String,
  resetToken: String,
  ipAddress: String,
});

module.exports = mongoose.model('User', UserModel);
