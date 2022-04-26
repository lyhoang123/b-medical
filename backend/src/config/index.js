const connectDb = require('./mongoose.config');
const envVars = require('./env.config');

module.exports = {
  connectDb,
  envVars,
};
