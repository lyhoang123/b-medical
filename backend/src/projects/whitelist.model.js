const mongoose = require('mongoose');

const whitelistSchema = mongoose.Schema({
  pid: {
    type: Number,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  tier: {
    type: Number,
    required: true,
  },
  allocation: {
    type: String,
  },
});

module.exports = mongoose.model('whitelists', whitelistSchema);
