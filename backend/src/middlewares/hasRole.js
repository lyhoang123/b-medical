const { ROLES } = require('../constants');

const hasRole = (ROLES) => (req, res, next) => {
  const roleValues = Object.values(ROLES);
  if (
    !ROLES?.length ||
    [...new Set([...ROLES, ...roleValues])].length > roleValues.length
  )
    return res.status(400).send('ROLE: Invalid');

  const roleAccept = ROLES.reduce((r, acc) => r * acc, 1);

  if (req.user.role % roleAccept === 0) return next();

  return res.status(401).send('Unauthorized');
};

module.exports = hasRole;
