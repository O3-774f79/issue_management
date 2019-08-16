import React, {useState} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {useAuth} from '../../context/auth';

const Login = props => {
  const [userName, setUserName] = useState ('');
  const [password, setPassword] = useState ('');
  const [isLoggedIn, setLoggedIn] = useState (false);
  const [isError, setIsError] = useState (false);
  const {setAuthTokens} = useAuth ();
  const referer = '/issue';
  const _handleSubmit = () => {
    axios
      .post ('https://digitalsignature.herokuapp.com/api/Login', {
        userName,
        password,
      })
      .then (result => {
        if (result.status === 200) {
          setAuthTokens (result.data.employee);
          setLoggedIn (true);
        } else {
          setIsError (true);
        }
      })
      .catch (e => {
        setIsError (true);
      });

  };
  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <div>
      {props.title}
      <input
        value={userName}
        name="id"
        type="text"
        onChange={e => setUserName (e.target.value)}
      />
      <input
        value={password}
        name="password"
        type="password"
        onChange={e => setPassword (e.target.value)}
      />
      <button onClick={() => _handleSubmit ()}>login</button>
      <Link to="/signup">Don't have an account?</Link>
      {isError && <div>The username or password provided were incorrect!</div>}
    </div>
  );
};

export default Login;
