import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {Layout, Menu, Breadcrumb} from 'antd';
import LogoutTab from './logout/logout';
import NotificationRight from './notification_right';
const {Content, Footer} = Layout;
const LayoutTemplate = props => (
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
        defaultSelectedKeys={['2']}
        style={{lineHeight: '64px', width: 300}}
      >
        <Menu.Item key="1"> <Link to="/issue">inbox </Link></Menu.Item>
        <Menu.Item key="2">เพิ่มผู้ใช้</Menu.Item>
      </Menu>
      <div style={{display: 'flex'}}>
        <NotificationRight />
        <LogoutTab />
      </div>
    </div>
    <Content style={{padding: '0 50px'}}>
      <Breadcrumb style={{margin: '16px 0'}}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{background: '#fff', padding: 24, minHeight: 280}}>
        {props.children}
      </div>
    </Content>
    <Footer style={{textAlign: 'center'}}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);

export default LayoutTemplate;
