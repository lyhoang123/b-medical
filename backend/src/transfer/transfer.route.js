const transferRoute = require('express').Router();

const { getTransfers, getTransfersHistory } = require('./transfer.controller');

transferRoute.route('/').get(getTransfers);

transferRoute.route('/:account').get(getTransfersHistory);

module.exports = transferRoute;
