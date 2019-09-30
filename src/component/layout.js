import React, { useState } from 'react';

import 'antd/dist/antd.css';
import { BrowserRouter as Router, Link, Route, Redirect, } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import LogoutTab from './logout/logout';
import NotificationRight from './notification_right';
const { Content, Footer } = Layout;



const LayoutTemplate = props => {

  const [current, setCurrent] = useState(['/issue']);
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
          defaultSelectedKeys={current}
          defaultOpenKeys={current}
          style={{ lineHeight: '64px', width: 300 }}

        >
          <Menu.Item key="/issue">
            <Link to="/issue">
              inbox
          </Link>
          </Menu.Item>
          {props.authTokens.userType === 'ADMIN' ?
            <Menu.Item key="/register">
              <Link to="/register">
                เพิ่มผู้ใช้
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
