const { POOL_STATUSES } = require('../constants');
const { catchReqRes } = require('../utils');
const ProjectModel = require('./pool.model');
const WhitelistModel = require('./whitelist.model');

const createProject = catchReqRes(async (req, res) => {
  const newProject = new ProjectModel(req.body);
  await newProject.save();
  res.json(newProject);
});

const getProjects = catchReqRes(async (req, res) => {
  const projects = await ProjectModel.find().lean();
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const _projects = projects.map((project) => {
    const {
      startTime,
      startTimeSwapFrom,
      startTimeSwapDuration,
      startTimeClaim,
    } = project;
    let status;
    if (
      !!startTime &&
      startTime > currentTimestamp &&
      currentTimestamp < startTimeSwapFrom
    ) {
      status = POOL_STATUSES.register;
    } else if (
      (!!startTimeSwapFrom &&
        startTimeSwapFrom &&
        +startTimeSwapFrom !== 0 &&
        +startTimeSwapDuration !== 0 &&
        startTimeSwapFrom > currentTimestamp &&
        +startTimeSwapFrom + +startTimeSwapDuration > currentTimestamp) ||
      currentTimestamp < startTimeClaim
    ) {
      status = POOL_STATUSES.deposit;
    } else if (startTimeClaim !== 0 && startTimeClaim < currentTimestamp) {
      status = POOL_STATUSES.claim;
    }
    return { ...project, status };
  });
  res.json(_projects);
});

const getProjectBySlug = catchReqRes(async (req, res) => {
  const { slug } = req.params;
  const project = await ProjectModel.findOne({ slug }).lean();
  if (!project) return res.status(400).send('not found');
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const {
    startTime,
    startTimeSwapFrom,
    startTimeSwapDuration,
    startTimeClaim,
  } = project;
  let status;
  if (
    !!startTime &&
    startTime > currentTimestamp &&
    currentTimestamp < startTimeSwapFrom
  ) {
    status = POOL_STATUSES.register;
  } else if (
    (!!startTimeSwapFrom &&
      startTimeSwapFrom &&
      +startTimeSwapFrom !== 0 &&
      +startTimeSwapDuration !== 0 &&
      startTimeSwapFrom > currentTimestamp &&
      +startTimeSwapFrom + +startTimeSwapDuration > currentTimestamp) ||
    currentTimestamp < startTimeClaim
  ) {
    status = POOL_STATUSES.deposit;
  } else if (startTimeClaim !== 0 && startTimeClaim < currentTimestamp) {
    status = POOL_STATUSES.claim;
  }
  res.json({ ...project, status });
});

const getWinners = catchReqRes(async (req, res) => {
  const { slug } = req.params;
  const project = await ProjectModel.findOne({ slug }).lean();
  if (!project) return res.status(400).send('not found');
  const [allocations, total] = await Promise.all([
    WhitelistModel.find({
      pid: project.pid,
      allocation: { $exists: true },
    })
      .skip(0)
      .limit(10),
    WhitelistModel.countDocuments({
      pid: project.pid,
      allocation: { $exists: true },
    }),
  ]);
  res.json({ data: allocations, total });
});

module.exports = {
  createProject,
  getProjects,
  getProjectBySlug,
  getWinners,
};
