const mongoose = require('mongoose');

const blockSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  latestBlock: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('blocks', blockSchema);
