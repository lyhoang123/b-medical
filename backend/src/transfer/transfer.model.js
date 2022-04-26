const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
  transactionHash: {
    type: String,
    required: true,
  },
  transactionIndex: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  pid: {
    type: String,
    required: true,
  },
  newId: {
    type: String,
    required: true,
  },
  oldOwner: {
    type: String,
    required: true,
  },
  newOwner: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('transfers', transferSchema);
