import React, {useState} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import PrivateRoute from './component/privateRoute';
import {AuthContext} from './context/auth';
import LayoutTemplate from './component/layout';
import Login from './page/Login';
import Issue from './page/Issue';

function App (props) {
  const [authTokens, setAuthTokens] = useState ();

  const setTokens = data => {
    localStorage.setItem ('tokens', JSON.stringify (data));
    setAuthTokens (data);
  };

  return (
    <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
      <Router>
        <div>
          <Route exact path="/login" component={Login} />
          {/* <PrivateRoute path="/issue" component={Issue} /> */}
          <LayoutTemplate>
            <Route path="/issue" component={Issue} />
          </LayoutTemplate>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
