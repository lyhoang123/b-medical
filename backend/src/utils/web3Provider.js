const Web3 = require('web3');
const { envVars } = require('../config');

const getWeb3 = () =>
  new Web3(new Web3.providers.HttpProvider(envVars.RPC_URL));

const getWeb3Wss = () =>
  new Web3WsProvider(envVars.RPC_WSS_URL, {
    timeout: 30000, // ms
    clientConfig: {
      // Useful to keep a connection alive
      keepalive: true,
      keepaliveInterval: 60000, // ms
    },
    // Enable auto reconnection
    reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 5,
      onTimeout: false,
    },
  });

module.exports = {
  getWeb3,
  getWeb3Wss,
};
