const mongoose = require('mongoose');

const { Schema } = mongoose;

const TranxModel = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reason: String,
  amount: Number,
  ref: String,
  date: Date,
});

module.exports = mongoose.model('Transaction', TranxModel);
