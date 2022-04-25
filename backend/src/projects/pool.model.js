const mongoose = require('mongoose');

const { ROLES } = require('../constants');

const projectSchema = mongoose.Schema({
  pid: {
    type: Number,
    unique: true,
    required: true,
    index: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  summary: {
    type: String,
    trim: true,
    required: true,
  },
  desc: {
    type: String,
  },
  tokenA: {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    decimals: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  tokenB: {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    decimals: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  tokenAPrice: {
    type: String,
    required: true,
  },
  tokenAmountAPreOrder: {
    type: String,
    required: true,
  },
  maxTokenBCanBuy: {
    type: String,
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  startTimeSwapFrom: {
    type: Number,
    required: true,
  },
  startTimeSwapDuration: {
    type: Number,
    required: true,
  },
  startTimeClaim: {
    type: Number,
    required: true,
  },
  claimBatches: [
    {
      timestamp: {
        type: Number,
        required: true,
      },
      percent: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model('projects', projectSchema);
