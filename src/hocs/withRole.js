import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from 'context/GlobalContext';
import { useHistory } from 'react-router-dom';
import { ROLES_WITH_USER_ADMIN } from 'configs';

export default function withRole(WrappedComponent, rolesAccepted = []) {
  return () => {
    const { roles } = useContext(GlobalContext);
    const history = useHistory();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (
        !rolesAccepted.length ||
        (rolesAccepted.length &&
          !rolesAccepted.includes(ROLES_WITH_USER_ADMIN.USERS) &&
          !rolesAccepted.some((r) => roles.includes(r)))
      ) {
        history.push('/');
      } else {
        setLoading(false);
      }
    }, [history, roles, rolesAccepted]);

    return !loading ? <WrappedComponent /> : null;
  };
}
