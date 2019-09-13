import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';

import {
    Button,
    Input,
    Col,
    Row,
    Form,
    Icon,
    Card,
    Select,
    Alert,


} from 'antd';
import Axios from 'axios';



  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
const Forgetpass = () => {

    const [email, setEmail] = useState('');
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [statussubmit, setStatussubmit] = useState(false);
    const [errorStat, setError] = useState(false);
    const [message, setMessage] = useState('');

    const handlesubmit = (event) => {
        const http = Axios.create({
            // baseURL:'http://localhost:50000/api',
            baseURL: 'http://139.180.130.44:50000/api',
            // headers:{'Cache-Control': 'no-cache' },
            headers: { 'Access-Control-Allow-Origin': '*' ,
            
          },
          })
        setStatussubmit(false)
        setError(false)
        setMessage('')
        http.post('/Password/ForgetPassword'
        // Axios.post(
        //     'http://localhost:50000/api/Password/ForgetPassword'
            , {
                email: email,
                firstnameEN: Fname,
                lastnameEN: Lname,

            })
            .then((res) => {

                if (res.status === 200) {

                    if (res.data.isError === true) {
                        setStatussubmit(false)
                        setError(true)
                        setMessage(res.data.message);


                    } else {

                        setStatussubmit(true)
                        setError(false)
                        setMessage('Email sended please check your inbox')

                    }
                }
            })
            .catch(isError => {

                // setStatussubmit(false)
                // setError(true)
                // setMessage('Input incorrect')

            })
    }
    return (
        <div className="login-box">
            <Row type="flex" align="middle">
                <Col className="login-box-body" >
                    <Card title='Forget Password' type="flex" justify="center" align="middle" style={{ width: 350 }}>

                        <Form className="login-form" style={{ width: "80%", height: "100%", textAlign: 'center' }}>

                            <Form.Item>

                                <Input
                                    required
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}

                                />
                            </Form.Item>
                            <Form.Item>

                                <Input
                                    required
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
                                    type="text"
                                    placeholder="First name English"
                                    name="firstname"
                                    value={Fname}
                                    onChange={e => setFname(e.target.value)}


                                />
                            </Form.Item>
                            <Form.Item>

                                <Input
                                    required
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
                                    type="text"
                                    placeholder="Last name English"
                                    name="lastname"
                                    value={Lname}
                                    onChange={e => setLname(e.target.value)}


                                />
                            </Form.Item>

                            <Form.Item>
                                <Col>
                                    <Button type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        onClick={() => handlesubmit()}

                                    >
                                        Submit
                                </Button>
                                </Col>
                                <Col>
                                    <Link to='/' >
                                        <Button type="danger"

                                            className="login-form-button"

                                        >
                                            Cancel
                                </Button>
                                    </Link>
                                </Col>
                            </Form.Item>
                            <Form.Item>
                                <Col>
                                    {statussubmit ? <Alert type='success' message={message}></Alert> : null}
                                    {errorStat ? <Alert type='error' message={message}></Alert> : null}
                                </Col>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Forgetpass
