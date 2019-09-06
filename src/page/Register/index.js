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
    Alert,



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

    const [value, setValue] = useState('USER');

    const [statussubmit, setStatussubmit] = useState(false);
    const [errorStat, setError] = useState(false);
    const [message, setMessage] = useState([]);
    const [round, setRound] = useState([]);
    // useState({
    //     Email:'',
    //     TelNo:'',
    //     Password:'',
    //     UserType:'',
    //     LastNameEN:'',
    //     LastNameTH:'',
    //     CompanyCode:'',
    //     FirstNameEN:'',
    //     FirstNameTH:'',
    // });


    const { Option } = Select;



    const HandleSubmit = (event) => {
        setStatussubmit(false)
        setError(false)
        setMessage('')
        // setRound([]);
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
                companyCode: CCode,


            })
            .then((Resp) => {
                console.logo("Dat Resp", Resp)

            })
            .catch(error => {
               
                setError(true);
                // setMessage(error.response.data.TelNo[0]);
                
                if(error.response.data.Email !== undefined){
                    // setError(true);
                    // setMessage(error.response.data.Email[0])
                    round.push({Err:error.response.data.Email[0]})
                    
                }
                if(error.response.data.Password !== undefined){
                    // setError(true);
                    // setMessage(error.response.data.Password[0])
                    round.push({Err:error.response.data.Password[0]})

                }

                console.log(round);     
            })
    }



    useEffect(() => {
        Axios.get(
            '/Role/GetRole', {
            }
        )
            .then((result) => {
                setGetUser(result.data);

            })
            .catch(error => {

            })
    }, [])


    const onChangeSelect = value => {
        setValue(value);
        setUserType(value);

    }
    const options = GetUser.map(rolemap => <Option value={rolemap.valueKey}>{rolemap.valueText}</Option>)
    
    return (
        <div className="login-box">
            <Row type="flex" align="middle">
                <Col className="login-box-body" >
                    <Card title='Register' type="flex" justify="center" align="middle" style={{ width: 350 }}>

                        <Form className="login-form" style={{ width: "80%", height: "100%", textAlign: 'center' }}

                        >

                            <Form.Item>
                                {/* Email */}
                                <Input
                                    // required
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
                                    // required
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
                                    // required
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
                                    // required
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
                                    // required
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
                                    // required
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
                                    // required
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

                                    placeholder="Select role"
                                    value={value}
                                    onChange={onChangeSelect}
                                >

                                    {options}

                                </Select>
                            </Form.Item>
                            <Form.Item>
                                {/* TelNo */}
                                <Input
                                    // required
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
                                            className="login-form-button"


                                        >
                                            Cancel
                                </Button>
                                    </Link>
                                </Col>
                            </Form.Item>
                            <Form.Item>
                                <Col>
                                    {/* {statussubmit ? <Alert type='success' message={message}></Alert> : null} */}
                                    {errorStat ? 
                                    round.map( item => (<Alert type='error' message={item.Err}></Alert>)  ) : null}
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
