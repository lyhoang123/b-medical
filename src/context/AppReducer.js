import { SET_ROLES } from './types';

export const AppReducer = (state, action) => {
  switch (action.type) {
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };

    default:
      return state;
  }
};
