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


    const [Inemail, setEmail] = useState('');
    const [Inpassword, setPassword] = useState('');
    const [Inconpassword, setConPassword] = useState('');
    const [FnameTH, setFnameTH] = useState('');
    const [LnameTH, setLnameTH] = useState('');
    const [FnameEN, setFnameEN] = useState('');
    const [LnameEN, setLnameEN] = useState('');
    const [InuserType, setUserType] = useState('');
    const [PhoneNo, setPhoneNo] = useState('');
    const [CCode, setCcode] = useState('1000');

    const [GetUser, setGetUser] = useState([]);

    const [value, setValue] = useState ('User');

    const { Option } = Select;

    const HandleSubmit = (event) => {
        // event.preventDefault();
        Axios.post(
            '/Register', {
                email: Inemail,
                password: Inpassword,
                confirmPassword: Inconpassword,
                firstNameTh: FnameTH,
                lastNameTh: LnameTH,
                firstNameEn: FnameEN,
                lastNameEn: LnameEN,
                userType: InuserType,
                telNo: PhoneNo,
                companyCode:CCode,
              
                
            })
            .then((Resp) => {

                // setEmail('');
                // setPassword('');
                // setConPassword('');
                // setFnameTH('');
                // setLnameTH('');
                // setFnameEN('');
                // setLnameEN('');
                // setPhoneNo('');


                console.log(Inemail)
                console.log(Inpassword)
                console.log(Inconpassword)
                console.log(FnameTH)
                console.log(LnameTH)
                console.log(FnameEN)
                console.log(LnameEN)
                console.log(InuserType)
                console.log(PhoneNo)
                console.log(CCode)
                console.log("Goods")
                // event.preventDefault();

                console.log("Success Register")
            })
            .catch(error => {
                console.log("Error Regis",error)

                console.log(Inemail)
                console.log(Inpassword)
                console.log(Inconpassword)
                console.log(FnameTH)
                console.log(LnameTH)
                console.log(FnameEN)
                console.log(LnameEN)
                console.log(InuserType)
                console.log(PhoneNo)
                console.log(CCode)
                console.log("Bad")
                
                
            })
    }
    useEffect(() => {
        Axios.get(
            '/Role/GetRole', {
            }
        )
            .then((result) => {
                setGetUser(result.data);
                console.log("Role get", result.data)
            })
            .catch(error => {
                console.log("error get role".error)
            })
    }, [])


    const onChangeSelect = value => {
        setValue(value);
        setUserType(value);
        console.log ("Check",value);
    }
    const options = GetUser.map(rolemap => <Option  value={rolemap.valueKey}>{rolemap.valueText}</Option>)

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
                                    value={Inemail}
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
                                    value={Inpassword}
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
                                    value={Inconpassword}
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
                                    // defaultValue={Getuser}
                                    // disabled={this.props.disStat}
                                    // value={GetUser}
                                    // value={userType}
                                    // onChange={e => setUserType(Number(e.target.value)
                                    //     )
                                    // }
                                    placeholder="Select role"
                                    value={value}
                                    onChange={onChangeSelect}
                                >
                                    {/* {GetUser.map(role =>(
                                        <Option key={role.valueKey} value={role.valueKey}>
                                            {role.valueText}
                                        </Option>
                                        )
                                    )} */}
                                    {options}
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
                                    type="text"
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
                                    <Link to='/issue'>
                                        <Button type="danger"
                                            // htmlType="cancel"
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
