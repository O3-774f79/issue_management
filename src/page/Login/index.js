import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';

import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Card,
  Col,
  Row,
  
} from 'antd'

const Login = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  const referer = '/issue';
  const _handleSubmit = () => {
    axios
      .post('https://digitalsignature.herokuapp.com/api/Login', {
        userName,
        password,
      })
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data.employee);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        setIsError(true);
      });

  };
  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <div>
      <div className="login-box">
        <Row type="flex" align="middle">
          <Col className="login-box-body" >
            <Card title='Login' type="flex" justify="center" align="middle" style={{ width: 350 }}>

              <Form className="login-form" style={{ width: "80%", height: "100%", textAlign: 'center' }}>
              {props.title}
              <Form.Item>
              <Input
                value={userName}
                name="id"
                type="text"
                onChange={e => setUserName(e.target.value)}
              />
              </Form.Item>
              <Form.Item>
              <Input
                value={password}
                name="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
              </Form.Item>
              <Form.Item>
              <Button onClick={() => _handleSubmit()}>login</Button>
              </Form.Item>
              <Form.Item>
              <Link to="/signup">Don't have an account?</Link>
              {isError && <div>The username or password provided were incorrect!</div>}
              </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
