if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line global-require
}
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { configPassport, connectDb } = require('./config');
const setupRoutes = require('./routes');
const cronJobs = require('./cron-jobs');

const app = express();

// connect to DB
// connectDb();

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());

// setup routes
setupRoutes(app);

// cron-jobs
cronJobs();

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is running on port ${port}`));
