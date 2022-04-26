const CronJob = require('cron').CronJob;
const Queue = require('bull');
const { getWeb3 } = require('../utils/web3Provider');
const { envVars } = require('../config');
const LaunchpadABI = require('../abis/Launchpad.json');
const Transfer = require('../transfer/transfer.model');
const BlockModel = require('../transfer/block.model');

global.cronRunning = false;

const maxBlockGetPast = 1000;

const getPastEvents = new CronJob(
  '* * * * *',
  async () => {
    if (global.cronRunning) return;
    global.cronRunning = true;
    try {
      const web3 = getWeb3();
      const latestBlock = await web3.eth.getBlockNumber();
      const launchpadContract = new web3.eth.Contract(LaunchpadABI, envVars.LAUNCHPAD_ADDRESS);
      _getPastEvents(launchpadContract, latestBlock, +envVars.LAUNCHPAD_DEPLOYED_BLOCK);
    } catch (error) {
      console.log('ERROR getPastEvents: ', error);
      global.cronRunning = false;
    }
  },
  null,
  true,
  'America/Los_Angeles'
);

const _getPastEvents = async (contract, latestBlock, fromBlock) => {
  try {
    if (fromBlock >= latestBlock) {
      global.cronRunning = false;
      return;
    }
    const toBlock = latestBlock - fromBlock > maxBlockGetPast ? fromBlock + maxBlockGetPast : latestBlock;

    const events = await contract.getPastEvents('allEvents', {
      fromBlock,
      toBlock: toBlock,
    });
    await Promise.all(events.map(handleEvent));
    await BlockModel.findOneAndUpdate(
      { type: 'TRANSFER_EVENTS' },
      {
        type: 'TRANSFER_EVENTS',
        latestBlock: toBlock,
      },
      {
        upsert: true,
      }
    );
    _getPastEvents(contract, latestBlock, toBlock);
  } catch (error) {
    console.log('ERROR _getPastEvents: ', error);
    global.cronRunning = false;
  }
};

const handleEvent = (event) => {
  if (!event.event) return;
  // console.log(event);
  switch (event.event) {
    case 'Transfer':
      return handleTransferEvent(event);
    default:
      return;
  }
};

const handleTransferEvent = async (event) => {
  try {
    const { transactionHash, transactionIndex } = event;
    const transaction = await Transfer.findOne({ transactionHash, transactionIndex });
    if (transaction) return;
    await new Transfer({ ...event.returnValues, transactionHash, transactionIndex }).save();
  } catch (error) {
    throw error;
  }
};

// const handleBuyEvent = async (event) => {
//   try {
//     const { pid, sender, amountA, amountB, timestamp } = event.returnValues;
//     const buyExists = await BuyModel.findOne({
//       pid,
//       sender,
//       amountA,
//       amountB,
//       timestamp,
//     });
//     if (buyExists) return;
//     await new BuyModel({ pid, sender, amountA, amountB, timestamp }).save();
//     buyQueue.add({ pid, sender, amountA });
//   } catch (error) {
//     throw error;
//   }
// };

const cronJobs = () => {
  getPastEvents.start();
};

module.exports = cronJobs;
