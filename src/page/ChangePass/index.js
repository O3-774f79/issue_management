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

const index = () => {
    
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
                                    name="password"
                                    // value={this.state.UserInput}
                                    // onChange={this.UserChange}

                                />
                            </Form.Item>
                            <Form.Item>

                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    // value={this.state.PassInput}
                                    // onChange={this.PassChange}


                                />
                            </Form.Item>
                            <Form.Item>

                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="Conpassword"
                                    // value={this.state.PassInput}
                                    // onChange={this.PassChange}


                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    // onClick={this.handleSubmit}

                                >
                                    Submit
                                </Button>

                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default index
