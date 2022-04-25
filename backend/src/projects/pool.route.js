const poolRoute = require('express').Router();

const {
  createProject,
  getProjects,
  getProjectBySlug,
  getWinners,
} = require('./pool.controller');

poolRoute.route('/').get(getProjects).post(createProject);
poolRoute.route('/:slug').get(getProjectBySlug);
poolRoute.route('/:slug/winners').get(getWinners);

module.exports = poolRoute;
