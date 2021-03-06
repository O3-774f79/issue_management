import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';

import 'antd/dist/antd.css';
import { Form, Input, Button, Card, Col, Row, } from 'antd';

const Login = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [firstLogin, setfirstlogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);

  const [message, setMessage] = useState('');

  const { setAuthTokens } = useAuth();
  const referer = '/issue';
  const changepass = '/ChangePassFL';

  const http = axios.create({

    baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',

    },
  });

  const _handleSubmit = () => {
    setIsError(false);
    setMessage('');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    http
      .post(
        `/Login`,
        {
          userName,
          password,
        }
      )
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data.employee);
          setfirstlogin(result.data.employee.firstLogin);
          setLoggedIn(true);
          localStorage.setItem('UseTok', result.data.token);

        }
        if (result.status === 401) {
          setIsError(true);
          setMessage(result.data.message);

        }
      })
      .catch(e => {
        setIsError(true);

        setMessage(e.response.data.message)

      });

  };
  if (isLoggedIn) {
    if (firstLogin) {
      return <Redirect to={changepass} />;
    } else {
      return <Redirect to={referer} />;
    }
  }

  return (
    <div className="login-box">
      <Row type="flex" align="middle">

        <Col className="login-box-body">
          <Card
            title="Login"
            type="flex"
            justify="center"
            align="middle"
            style={{ width: 350 }}
          >

            <Form
              className="login-form"
              style={{ width: '80%', height: '100%', textAlign: 'center' }}
            >
              {props.title}
              <Form.Item >
                <Input
                  required
                  value={userName}
                  name="id"
                  type="text"
                  onChange={e => setUserName(e.target.value)}
                />

              </Form.Item>
              <Form.Item>
                <Input
                  required
                  value={password}
                  name="password"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>

                {isError ? <p style={{ color: 'red' }}>{message}</p> : null}
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={loading}
                  onClick={() => _handleSubmit()}
                >
                  Login
                </Button>
              </Form.Item>
              <Form.Item>

                <Link to="/forgetpass"><p>Forget Password</p></Link>
              </Form.Item>

            </Form>
          </Card>
        </Col>

      </Row>
    </div>
  );
};

export default Login;
