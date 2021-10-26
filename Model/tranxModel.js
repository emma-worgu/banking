const mongoose = require('mongoose');

const { Schema } = mongoose;

const TranxModel = new Schema({
  sender: String,
  receiver: String,
  amount: Number,
  accountNumber: String,
});

module.exports = mongoose.model('Transaction', TranxModel);
