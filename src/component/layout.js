import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {Layout, Menu, Breadcrumb} from 'antd';
import {useAuth} from '../context/auth';

const {Header, Content, Footer} = Layout;
const LayoutTemplate = props => (
  <Layout className="layout">
    <Header>
      <div style={{diaplay: 'flex'}}>
        <div>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="1"> <Link to="/issue">inbox </Link></Menu.Item>
            <Menu.Item key="2">เพิ่มผู้ใช้</Menu.Item>
          </Menu>
        </div>
      </div>
    </Header>
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
