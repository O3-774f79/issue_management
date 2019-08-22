import React, { useState } from 'react'
import {
    Button,
    Input,
    Col,
    Row,
    Form,
    Icon,
    Card,
    Select,


} from 'antd';


const index = () => {

    const { Option } = Select;

    return (
        <div className="login-box">
            <Row type="flex" align="middle">
                <Col className="login-box-body" >
                    <Card title='Register' type="flex" justify="center" align="middle" style={{ width: 350 }}>

                        <Form className="login-form" style={{ width: "80%", height: "100%", textAlign: 'center' }}>

                            <Form.Item>

                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                // value={this.state.UserInput}
                                // onChange={this.UserChange}

                                />
                            </Form.Item>
                            <Form.Item>

                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
                                    type="text"
                                    placeholder="First name"
                                    name="firstname"
                                // value={this.state.PassInput}
                                // onChange={this.PassChange}


                                />
                            </Form.Item>
                            <Form.Item>

                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
                                    type="text"
                                    placeholder="Last name"
                                    name="lastname"
                                // value={this.state.PassInput}
                                // onChange={this.PassChange}


                                />
                            </Form.Item>
                       
                            <Form.Item>
                                <Col>
                                    <Button type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    // onClick={this.handleSubmit}

                                    >
                                        Submit
                                </Button>
                                </Col>
                                <Col>
                                    <Button type="danger"
                                        htmlType="cancel"
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

export default index
