import React, { useState } from 'react';
import { Link, Route, Redirect, } from 'react-router-dom';
import PrivateRoute from './component/privateRoute';
import { AuthContext } from './context/auth';
import LayoutTemplate from './component/layout';
import Login from './page/Login';
import Issue from './page/Issue';
import ChangePass from './page/ChangePass';
import ChangePassFL from './page/ChangePass/ChangepassFL';
import Register from './page/Register';
import Forgetpass from './page/ForgetPass';


function App(props) {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <div>
        <Route exact path="/" component={Login} />
        {/* <LayoutTemplate> */}

        <PrivateRoute path="/issue" component={Issue} />
        <PrivateRoute path="/ChangePass" component={ChangePass} />
        <PrivateRoute path="/ChangePassFL" component={ChangePassFL} />
        <Route path="/Forgetpass" component={Forgetpass} />
        <PrivateRoute path="/register" component={Register} />

        {/* </LayoutTemplate> */}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
