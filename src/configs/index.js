export const RPC_CHAIN_ID = 97;

export const RPC_NODE_1 = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

export const MEDICAL_FACTORY_ADDRESS = '0x6F33085E638524a934Ef323adAF6028E3F8Af618';

export const MEDICAL_FACTORY_METHODS = {
  agentInfos: 'agentInfos',
  registerProvider: 'registerProvider',
  getPendingProviders: 'getPendingProviders',
  approveProvider: 'approveProvider',
  enterProduct: 'enterProduct',
  _products: '_products',
  getProductsPending: 'getProductsPending',
  approveOrRejectProduct: 'approveOrRejectProduct',
  getProductsSoldMarketplace: 'getProductsSoldMarketplace',
  buyMarketplace: 'buyMarketplace',
  ownerQuantityProducts: 'ownerQuantityProducts',
  roles: 'roles',
  owner: 'owner',
  providerVerified: 'providerVerified',
};

export const ROLES = {
  CENSOR: 0,
  PROVIDER: 1,
};

export const ROLES_WITH_USER_ADMIN = {
  ...ROLES,
  USERS: 998,
  ADMIN: 999,
};
