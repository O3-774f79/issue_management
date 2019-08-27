import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
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
import Axios from 'axios';





const Register = props => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conpassword, setConPassword] = useState('');
    const [FnameTH, setFnameTH] = useState('');
    const [LnameTH, setLnameTH] = useState('');
    const [FnameEN, setFnameEN] = useState('');
    const [LnameEN, setLnameEN] = useState('');
    const [userType, setUserType] = useState('');
    const [PhoneNo, setPhoneNo] = useState('');

    const [GetUser, setGetUser] = useState([]);
   

    const { Option } = Select;

    const HandleSubmit = (event) => {
        event.preventDefault();
        Axios.post(
            '/Register', {
                email: email,
                password: password,
                confirmPassword: conpassword,
                firstNameTh: FnameTH,
                lastNameTh: LnameTH,
                firstNameEn: FnameEN,
                lastNameEn: LnameEN,
                userType: userType,
                telNo: PhoneNo,
            })
            .then((Resp) => {

                console.log("Success Register")
            })
            .catch(error => {
                console.log("Error Regis".error)
            })
    }
    useEffect(() => {
        Axios.get(
            '/Role/GetRole', {
            }
        )
            .then((result) => {
                setGetUser(result.data);
                console.log(result.data)
            })
            .catch(error => {
                console.log("error get role".error)
            })
    }, [])
    



    return (
        <div className="login-box">
            <Row type="flex" align="middle">
                <Col className="login-box-body" >
                    <Card title='Register' type="flex" justify="center" align="middle" style={{ width: 350 }}>

                        <Form className="login-form" style={{ width: "80%", height: "100%", textAlign: 'center' }}
                        // onSubmit={this.HandleSubmit}
                        >

                            <Form.Item>
                                {/* Email */}
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="E-mail"
                                    name="mail"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}

                                />
                            </Form.Item>
                            <Form.Item>
                                {/* Password */}
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}


                                />
                            </Form.Item>
                            <Form.Item>
                                {/* Confirm Password */}
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', textAlign: 'center' }} />}
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="Conpassword"
                                    value={conpassword}
                                    onChange={e => setConPassword(e.target.value)}


                                />
                            </Form.Item>
                            <Form.Item>
                                {/* FirstName TH */}
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Firstname TH"
                                    name="FirstnameTH"
                                    value={FnameTH}
                                    onChange={e => setFnameTH(e.target.value)}

                                />
                            </Form.Item>
                            <Form.Item>
                                {/* Lastname TH */}
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Lastname TH"
                                    name="LastnameTH"
                                    value={LnameTH}
                                    onChange={e => setLnameTH(e.target.value)}

                                />
                            </Form.Item>
                            <Form.Item>
                                {/* Firstname EN */}
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Firstname EN"
                                    name="FirstnameEN"
                                    value={FnameEN}
                                    onChange={e => setFnameEN(e.target.value)}

                                />
                            </Form.Item>
                            <Form.Item>
                                {/* Lastname EN */}
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Lastname EN"
                                    name="LastnameEN"
                                    value={LnameEN}
                                    onChange={e => setLnameEN(e.target.value)}

                                />
                            </Form.Item>
                            <Form.Item>
                                {/* UserType */}
                                <Select

                                    name='roleSel'
                                    // placeholder="Select role"
                                    // defaultValue="User"
                                    // disabled={this.props.disStat}
                                    value={userType}
                                    onChange={e => setUserType(Number(e.target.value)
                                        )
                                    }
                                  
                                >
                                    {GetUser.map(role =>(
                                        <Option key={role.valueKey} value={role.valueKey}>
                                            {role.valueText}
                                        </Option>
                                        )
                                    )}

                                    {/* <Option value="1">User</Option>
                                    <Option value="2">Manager</Option>
                                    <Option value="3">Admin</Option> */}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                {/* TelNo */}
                                <Input
                                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Telephone Number"
                                    name="TelNo"
                                    value={PhoneNo}
                                    onChange={e => setPhoneNo(e.target.value)}

                                />
                            </Form.Item>
                            <Form.Item>
                                <Col>
                                    <Button type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        onClick={() => HandleSubmit()}

                                    >
                                        Submit
                                </Button>
                                </Col>
                                <Col>
                                    <Link to='/login'>
                                        <Button type="danger"
                                            htmlType="cancel"
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

export default Register
