const trim = require('lodash/trim'); // eslint-disable-line import/no-unresolved

const transferRoute = require('./transfer/transfer.route');

const baseApiPath = '/api/v1';

const genPath = (path) => `${baseApiPath}/${trim(path, '/')}`;

const routes = [{ path: '/transfers/', handler: transferRoute }];

const setupRoutes = (app) => {
  routes.forEach((r) => app.use(genPath(r.path), r.handler));
  app.get('/', (req, res) => res.send('Server is running...'));
  return app;
};

module.exports = setupRoutes;
