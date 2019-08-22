import React from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import {Menu, Icon, Dropdown, Avatar, Button} from 'antd';
import {useAuth} from '../../context/auth';
const LogoutTab = props => {
  const {setAuthTokens,authTokens} = useAuth ();
  console.log(`het`,setAuthTokens)
  console.log('checkckckck',authTokens)
  function logOut () {
    setAuthTokens ();
  }
  
  const menu = (
    <Menu>
      <Menu.Item>
        <div
          onClick={logOut}
          style={{
            fontSize: '15px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div><Icon type="logout" style={{marginRight: 10}} /></div>
          <div>Log out</div>
        </div>
      </Menu.Item>
      <Menu.Item>
      <Link to="/changepass">  <div
          // onClick={logOut}
          style={{
            fontSize: '15px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div><Icon type="lock" style={{marginRight: 10}} /></div>
          <div>Change Password</div>
        </div>
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div style={{display: 'flex', alignItems: 'center', marginRight: 5}}>
      <Dropdown overlay={menu} placement="bottomLeft" trigger={['hover']}>
        <Button shape="round" size={'large'}>
          <span
            style={{
              color: '#000',
              fontSize: '15px',
              marginRight: 5,
              paddign: 10,
            }}
          >
            <Avatar size={30} icon="user" style={{marginRight: 5}} />
            {authTokens.firstNameTh}
          </span>
        </Button>
      </Dropdown>

    </div>
  );
};

export default LogoutTab;
