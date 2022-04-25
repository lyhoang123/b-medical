const mongoose = require('mongoose');

const buySchema = mongoose.Schema({
  pid: {
    type: Number,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  amountA: {
    type: String,
    required: true,
  },
  amountB: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('buys', buySchema);
