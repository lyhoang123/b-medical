import React, { createContext, useReducer } from 'react';

import { AppReducer } from './AppReducer';
import { SET_ROLES } from './types';

// init state
const initState = {
  roles: [],
};

// create context
export const GlobalContext = createContext(initState);

// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initState);

  function setRoles(language) {
    dispatch({
      type: SET_ROLES,
      payload: language,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        roles: state.roles,
        setRoles,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
