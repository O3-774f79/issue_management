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


} from 'antd';
import Axios from 'axios';



const ChagePass = () => {

    const [oldpass, setOldpass] = useState('');
    const [newpass, setNewpass] = useState('');
    const [conpass, setConpass] = useState('');

    const [statussubmit, setStatussubmit] = useState(false);
    const [message, setMessage] = useState('');
    const handlesubmit = (event) => {
        const http = Axios.create({
            baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache',

            },
        })
        setStatussubmit(false);
        setMessage('');
        http.post('/Password/ChangePassword'
            , {
                oldPassword: oldpass,
                newPassword: newpass,
                confirmNewPassword: conpass

            })
            .then((res) => {

                if (res.data.isError === true) {
                    setStatussubmit(false)
                    setMessage(res.data.message)
                } else {
                    setStatussubmit(true)
                    setMessage('Change Password Complete')
                }
            })
            .catch(error => {
                console.log(error.response)
                console.log("Status Ja", error.response.status)
                if (error.response.status === 400 || error.response.status === 401) {
                    setStatussubmit(false)
                    setMessage('Password incorrect')

                }

            })
    }
    return (
        <div className="login-box">
            <Row type="flex" align="middle">
                <Col className="login-box-body" >
                    <Card title='Change password' type="flex" justify="center" align="middle" style={{ width: 350 }}>

                        <Form className="login-form" style={{ width: "80%", height: "100%", textAlign: 'center' }}>

                            <Form.Item>

                                <Input
                                    required
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Old password"
                                    name="oldpassword"
                                    value={oldpass}
                                    onChange={e => setOldpass(e.target.value)}
                                    autoComplete={false}
                                />
                            </Form.Item>
                            <Form.Item>

                                <Input
                                    required
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
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
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="Conpassword"
                                    value={conpass}
                                    onChange={e => setConpass(e.target.value)}


                                />
                            </Form.Item>
                            {statussubmit ?
                                <Form.Item><p style={{ color: 'green' }}>{message}</p></Form.Item> :
                                <Form.Item><p style={{ color: 'red' }}>{message}</p></Form.Item>}
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
                                    <Link to='/issue' >
                                        <Button type="danger"

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
    )
}

export default ChagePass
