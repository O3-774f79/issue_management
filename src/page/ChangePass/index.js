import React, { useState } from 'react'
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

    const handlesubmit = (event) => {
        // event.preventDefault();
        Axios.post(
            '/Password/ChangePassword', {
                oldPassword: oldpass,
                newPassword: newpass,
                confirmNewPassword: conpass

            })
            .then((res) => {
                console.log('Succes Change password', conpass)
            })
            .catch(error => {
                console.log("error change password".error)
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
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Old password"
                                    name="oldpassword"
                                    value={oldpass}
                                    onChange={e => setOldpass(e.target.value)}

                                />
                            </Form.Item>
                            <Form.Item>

                                <Input
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
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="Conpassword"
                                    value={conpass}
                                    onChange={e => setConpass(e.target.value)}


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
                                    <Button type="danger"
                                        // htmlType="cancel"
                                        className="login-form-button"
                                    // onClick={this.handleSubmit}

                                    >
                                        Cancel
                                </Button>
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
