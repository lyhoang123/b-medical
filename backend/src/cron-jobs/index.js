const CronJob = require('cron').CronJob;
const Queue = require('bull');
const { BigNumber } = require('@ethersproject/bignumber');
const BlockModel = require('../projects/block.model');
const WhitelistModel = require('../projects/whitelist.model');
const BuyModel = require('../projects/buy.model');
const { getWeb3 } = require('../utils/web3Provider');
const { envVars } = require('../config');
const LaunchpadABI = require('../abis/Launchpad.json');

const buyQueue = new Queue('buy-queue', {
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
  },
});

// console.log(buyQueue);

buyQueue.process(async function (job) {
  try {
    console.log(job.data);
    // const { pid, sender: account, amountA: amount } = job.data;
    // const whitelistExists = await WhitelistModel.findOne({ pid, account });
    // if (!whitelistExists) return Promise.resolve(true);
    // const oldAllocation = whitelistExists.allocation ?? '0';
    // const newAllocation = BigNumber.from(oldAllocation).add(
    //   BigNumber.from(amount),
    // );
    // await WhitelistModel.findOneAndUpdate(
    //   { pid, account },
    //   {
    //     allocation: newAllocation.toString(),
    //   },
    // );

    // return Promise.resolve(true);
  } catch (error) {
    Promise.reject(error);
  }
});

global.cronRunning = false;

const maxBlockGetPast = 1000;

const getPastEvents = new CronJob(
  '* * * * * *',
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
  console.log(latestBlock, fromBlock);
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
    // await BlockModel.findOneAndUpdate(
    //   { type: 'LAUNCHPAD_EVENTS' },
    //   {
    //     type: 'LAUNCHPAD_EVENTS',
    //     latestBlock: toBlock,
    //   },
    //   {
    //     upsert: true,
    //   }
    // );
    _getPastEvents(contract, latestBlock, toBlock);
  } catch (error) {
    console.log('ERROR _getPastEvents: ', error);
    global.cronRunning = false;
  }
};

const handleEvent = (event) => {
  if (!event.event) return;
  console.log(event);
  // switch (event.event) {
  //   case 'Whitelisted':
  //     return handleWhitelistedEvent(event);

  //   case 'Buy':
  //     return handleBuyEvent(event);

  //   default:
  //     return;
  // }
};

const handleWhitelistedEvent = async (event) => {
  try {
    const { pid, account, tier } = event.returnValues;
    const whitelistExists = await WhitelistModel.findOne({ pid, account });
    if (whitelistExists) return;
    await new WhitelistModel({ pid, account, tier }).save();
  } catch (error) {
    throw error;
  }
};

const handleBuyEvent = async (event) => {
  try {
    const { pid, sender, amountA, amountB, timestamp } = event.returnValues;
    const buyExists = await BuyModel.findOne({
      pid,
      sender,
      amountA,
      amountB,
      timestamp,
    });
    if (buyExists) return;
    await new BuyModel({ pid, sender, amountA, amountB, timestamp }).save();
    buyQueue.add({ pid, sender, amountA });
  } catch (error) {
    throw error;
  }
};

const cronJobs = () => {
  getPastEvents.start();
};

module.exports = cronJobs;
