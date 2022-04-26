const { POOL_STATUSES } = require('../constants');
const { catchReqRes } = require('../utils');
const Transfer = require('./transfer.model');

const getTransfers = catchReqRes(async (req, res) => {
  res.send('getTransfers');
});

const getTransfersHistory = catchReqRes(async (req, res) => {
  const { account } = req.params;
  const transfers = await Transfer.find({ $or: [{ oldOwner: account }, { newOwner: account }] });
  res.json(transfers);
});

module.exports = {
  getTransfers,
  getTransfersHistory,
};
