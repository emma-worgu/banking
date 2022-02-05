const mongoose = require('mongoose');

const { Schema } = mongoose;

const WithdrawalModel = new Schema({
  accountNumber: String,
  bankName: String,
  routingNumber: String,
  status: String,
  amount: Number,
  ref: String,
  date: Date,
});

module.exports = mongoose.model('Withdrawals', WithdrawalModel);
