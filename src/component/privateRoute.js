import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../context/auth';
import LayoutTemplate from './layout';
function PrivateRoute({component: Component, ...rest}) {
  const {authTokens} = useAuth ();
  console.log(authTokens)
  return (
    <Route
      {...rest}
      render={props =>
        authTokens
          ? <LayoutTemplate><Component {...props} /></LayoutTemplate>
          : <Redirect
              to={{pathname: '/login', state: {referer: props.location}}}
            />}
    />
  );
}

export default PrivateRoute;
