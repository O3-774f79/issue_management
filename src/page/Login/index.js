import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';

import 'antd/dist/antd.css';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Card,
  Col,
  Row,
  Alert,

} from 'antd'

const Login = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [firstLogin, setfirstlogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  const referer = '/issue';
  const changepass = '/ChangePassFL';
  const _handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    axios
      .post('/Login', {
        userName,
        password,
      })
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data.employee);


          setfirstlogin(result.data.employee.firstLogin);
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

    if (firstLogin) {

      return <Redirect to={changepass} />;
    }
    else {

      return <Redirect to={referer} />;
    }



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
                  <Button htmlType="submit" type='primary' loading={loading} onClick={() => _handleSubmit()}>Login</Button>
                </Form.Item>
                <Form.Item>
                
                  <Link to='/forgetpass'><p>Forget Password</p></Link>
                </Form.Item>
                <Form.Item>

                  {isError && <Alert type="error" message="The username or password provided were incorrect!" />}
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
