import React from 'react';
import {Menu, Icon, Dropdown, Avatar, Button} from 'antd';
import {useAuth} from '../../context/auth';
const LogoutTab = props => {
  const {setAuthTokens} = useAuth ();

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
        <div
          onClick={logOut}
          style={{
            fontSize: '15px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div><Icon type="lock" style={{marginRight: 10}} /></div>
          <div>Change Password</div>
        </div>
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
              paddign: 5,
            }}
          >
            <Avatar size={30} icon="user" style={{marginRight: 5}} />
            {props.user || 'user test111111111111111111'}
          </span>
        </Button>
      </Dropdown>

    </div>
  );
};

export default LogoutTab;
