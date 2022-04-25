const ROLES = {
  USER: 1,
  ADMIN: 3,
};

const EMAIL_TYPES = {
  REGISTER: 0,
  FORGOT_PASSWORD: 1,
  CHANGE_PASSWORD: 2,
};

const POOL_STATUSES = {
  register: {
    name: 'REGISTER',
    value: 1,
  },
  deposit: {
    name: 'DEPOSIT',
    value: 2,
  },
  claim: {
    name: 'CLAIM',
    value: 3,
  },
};

module.exports = {
  ROLES,
  EMAIL_TYPES,
  POOL_STATUSES,
};
