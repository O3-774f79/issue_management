import React from 'react';
import {Button} from '../components/AuthForms';
import {useAuth} from '../context/auth';

function LogoutTab (props) {
  const {setAuthTokens} = useAuth ();

  function logOut () {
    setAuthTokens ();
  }

  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default LogoutTab;