import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import LayoutTemplate from './layout';
function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  
  return (
    <Route
      {...rest}
      render={props =>
        authTokens
          ? <LayoutTemplate  authTokens={authTokens}><Component {...props} /></LayoutTemplate>
          :
          <Redirect
            to={{ pathname: '/', state: { referer: props.location } }} />
      }
    />
  );
}

export default PrivateRoute;
