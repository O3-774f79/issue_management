import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Button, Input, Col, Row, Form, Icon, Card } from 'antd';
import Axios from 'axios';


const ChagePassFL = () => {
  const [oldpass, setOldpass] = useState('');
  const [newpass, setNewpass] = useState('');
  const [conpass, setConpass] = useState('');

  const [tomain, setMain] = useState(false);

  const [statussubmit, setStatussubmit] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handlesubmit = event => {
    const http = Axios.create({
      baseURL: 'http://139.180.130.44:50000/api',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${localStorage.getItem('UseTok')}`,
      },
    });
    setStatussubmit(false);
    setMessage('');
    http
      .post(
        `/Password/ChangePassword`,
        {
          oldPassword: oldpass,
          newPassword: newpass,
          confirmNewPassword: conpass,
        }
      )
      .then(res => {
        if (res.data.isError === true) {
          setStatussubmit(false);
          setMessage(res.data.message);
          console.log(res.data);
        } else {
          setStatussubmit(true);
          setMessage('Change Password Complete');
          setTimeout(() => {
            setMain(true);
          }, 2000);
        }
      })
      .catch(error => {
        setStatussubmit(false);
        setMessage('Please Check NewPassword incorrect');
      });
    event.preventDefault();
  };
  return (
    <div className="login-box">

      {tomain ? <Redirect to="/issue" /> : null}

      <Row type="flex" align="middle">
        <Col className="login-box-body">
          <Card
            title="Change password"
            type="flex"
            justify="center"
            align="middle"
            style={{ width: 350 }}
          >

            <Form
              className="login-form"
              style={{ width: '80%', height: '100%', textAlign: 'center' }}
            >

              <Form.Item>

                <Input
                  required
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Old password"
                  name="oldpassword"
                  value={oldpass}
                  onChange={e => setOldpass(e.target.value)}
                />
              </Form.Item>
              <Form.Item>

                <Input
                  required
                  prefix={
                    <Icon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }}
                    />
                  }
                  type="password"
                  placeholder="Password"
                  name="newpassword"
                  value={newpass}
                  onChange={e => setNewpass(e.target.value)}
                />
              </Form.Item>
              <Form.Item>

                <Input
                  required
                  prefix={
                    <Icon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }}
                    />
                  }
                  type="password"
                  placeholder="Confirm Password"
                  name="Conpassword"
                  value={conpass}
                  onChange={e => setConpass(e.target.value)}
                />
              </Form.Item>
              {statussubmit
                ? <Form.Item>
                  <p style={{ color: 'green' }}>
                    <Icon type="loading" height="50em" width="50em" />
                    {' '}
                    {message}
                  </p>
                </Form.Item>
                : <Form.Item>
                  <p style={{ color: 'red' }}>{message}</p>
                </Form.Item>}
              <Form.Item>
                <Col>

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onClick={e => handlesubmit(e)}
                  >
                    Submit
                  </Button>
                </Col>
                <Col>
                  <Link to="/login">
                    <Button
                      type="danger"
                      className="login-form-button"
                    >
                      Cancel
                    </Button>
                  </Link>
                </Col>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChagePassFL;
