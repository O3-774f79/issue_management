import React, { useState } from 'react';

import 'antd/dist/antd.css';
import { HashRouter , Link, Route, Redirect, } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Tooltip } from 'antd';
import LogoutTab from './logout/logout';
import NotificationRight from './notification_right';
const { Content, Footer } = Layout;

const LayoutTemplate = props => {
  
  const [current, setCurrent] = useState(['1']);
  
  return (
    
    <Layout className="layout">
      <div className="logo" />
      <div
        style={{
          width: '100%',
          backgroundColor: '#001529',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={e => setCurrent(e.key)}
          selectedKeys={current}
          style={{ lineHeight: '64px', width: 300 }}

        >
          <Menu.Item key="1"  >
            
            <Link to="/issue" >
             <span>Inbox</span> 
          </Link>
          </Menu.Item>
          {props.authTokens.userType === 'ADMIN' ?
          <Menu.Item key="2" >
              <Link to="/register" >
              <span>Register</span>
             </Link>
            </Menu.Item>
            : null}


        </Menu>
        <div style={{ display: 'flex' }}>
          {/* <NotificationRight /> */}
          <LogoutTab />
        </div>
      </div>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        You Can Do It With Leaderplanet
    </Footer>
    </Layout>
    
  );
}



export default LayoutTemplate;
