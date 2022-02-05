const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModel = new Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  email: String,
  password: String,
  isClient: Boolean,
  accountBalance: {
    type: Number,
    default: 0.00,
  },
  accountNumber: String,
  phone: String,
  address: {
    houseAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  nextOfKin: String,
  isLinked: {
    type: Boolean,
    default: false,
  },
  isLinkedExpire: Date,
  transfer: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
      sender: Boolean,
    },
  ],
  pin: String,
  resetToken: String,
  ipAddress: String,
});

module.exports = mongoose.model('User', UserModel);
