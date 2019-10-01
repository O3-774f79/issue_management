import React from 'react';
import {
  Drawer,
  Button,
  Input,
  Col,
  Row,
  Select,
  Comment,
  Avatar,
  Form,
  Alert,
  TimePicker,
  Steps,
  InputNumber
} from 'antd';

import Axios from 'axios';
import moment, { relativeTimeThreshold } from 'moment';

import { useAuth } from '../../context/auth';
import { throwStatement } from '@babel/types';

const { Option } = Select;
const { TextArea } = Input;

const { Step } = Steps;



const Editor = ({ onChange, onSubmit, submitting, value, disabled }) => (
  <div>

    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} disabled={disabled} />
    </Form.Item>
    <Form.Item>

    </Form.Item>
  </div>
);


class Drawerplate extends React.Component {

  state = {
    openDrawer: false,

    disabledStat: false,
    hiddenStat: false,
    visible: false,
    submitting: false,
    loading: false,
    CheckError: false,
    CheckSuccess: false,
    TicketID: '',
    TicketNo: '',
    TicketName: '',
    TicketDesc: '',
    PriorityID: 1,
    PriorityName: 1,
    TicketStatus: 'เปิด',
    Priovalue: [],
    StatusList: [],
    TypeList: [],
    CreTime: '',
    StatepriorityName: '',
    Typepick: '',
    data: [],
    dataList: {},
    valueComments: '',
    CommentList: [],
    Message: '',
    date: '',
    Time: 0,
    ManHour: 0,

    // Status wait , process , finish , error
    StepStatus1: 'process',
    StepStatus2: 'wait',
    StepStatus3: 'wait',
    StepStatus4: 'wait',
  };

  componentDidMount() {

    const http = Axios.create({
      baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',

      },
    })

    http.get(`/Priority/GetList`
      , {
      },
    )
      .then((result) => {
        this.setState({
          Priovalue: result.data,

        })

      })
      .catch(error => {

      }
      )

    http.get(`/ValueHelp/GetTicketStatus`
      , {
      },
    )
      .then((getStat) => {
        this.setState({
          StatusList: getStat.data,

        })

      })
      .catch(error => {


      }
      )
    http.get(`/ValueHelp/GetTicketType`
      , {
      },
    )
      .then((getType) => {
        this.setState({
          TypeList: getType.data,

        })

      })
      .catch(error => {


      }
      )
  }



  componentWillReceiveProps(nextProps) {

    this.setState({
      valueComments: '',
      CheckSuccess: false,
      message: '',


    })

    if (this.props.dataList !== nextProps.dataList) {
      const http = Axios.create({
        baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',

        },
      })
      this.setState({
        TicketID: nextProps.dataList.id,
        TicketNo: nextProps.dataList.ticketNo,
        TicketName: nextProps.dataList.ticketName,
        TicketDesc: nextProps.dataList.description,
        PriorityID: nextProps.dataList.priorityId,
        TicketStatus: nextProps.dataList.status,
        CommentList: nextProps.commentList,

        Time: nextProps.dataList.onlineTime,
        Typepick: nextProps.dataList.ticketType,
        ManHour: nextProps.dataList.estimateTime,
        CreTime: nextProps.dataList.createDate,
      })


      if (nextProps.dataList.status === 'GETREQ'
      ) {
        this.setState({
          StepStatus1: 'process',
          StepStatus2: 'wait',
          StepStatus3: 'wait',
          StepStatus4: 'wait',
          current: 1,

        })


      } else if (nextProps.dataList.status === 'OPEN') {
        this.setState({
          StepStatus1: 'finish',
          StepStatus2: 'process',
          StepStatus3: 'wait',
          StepStatus4: 'wait',
          current: 2,

        })
      } else if (nextProps.dataList.status === 'WAITING') {
        this.setState({
          StepStatus1: 'finish',
          StepStatus2: 'finish',
          StepStatus3: 'process',
          StepStatus4: 'wait',
          current: 3,

        })
      } else if (nextProps.dataList.status === 'CLOSE') {
        this.setState({
          StepStatus1: 'finish',
          StepStatus2: 'finish',
          StepStatus3: 'finish',
          StepStatus4: 'finish',
          current: 4,

        })
      } else {
        this.setState({
          StepStatus1: 'process',
          StepStatus2: 'wait',
          StepStatus3: 'wait',
          StepStatus4: 'wait',
          current: 1,

        })
      }



      http.get(`/Ticket/GetTicketComment?ticketId=${nextProps.dataList.id}`
      )
        .then((ResComment) => {
          this.setState({
            CommentList: ResComment.data
          })


        })
        .catch(error => {

        }
        )
    }
  }


  onClose = () => {
    this.setState({
      visible: false,
      valueComments: '',
      CommentList: [],
      message:'',
      CheckError:false,
      CheckSuccess:false,
    });
  };




  handleOnSubmit = (event) => {

    

    this.setState({

      CheckError: false,
      CheckSuccess: false,
      Message: '',
      loading: true,
    });
  
    if(this.state.TicketName !== undefined
      && this.state.PriorityID !== undefined
      && this.state.Typepick !== undefined
      ){   
        this.setState({

          CheckError: false,
          CheckSuccess: false,
          Message: '',
          
        });
    if (
      this.props.formcontrol == 'add'
     
    ) {
      
      const http = Axios.create({
        baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',

        },
      })
      return (

        http.post(`/Ticket/OpenTicket`
          , {

            ticketName: this.state.TicketName,
            description: this.state.TicketDesc,
            priorityId: this.state.PriorityID,

            status: 'GETREQ',
            ticketType: this.state.Typepick,


          }
        ).then((ople) => {
          
          this.setState({
            TicketName: '',
            TicketDesc: '',
            PriorityID: 1,

            status: 'GETREQ',
            Typepick: 'K2',
            CheckError: false,
            CheckSuccess: true,
            loading: false,
            Message: 'Open Ticket complete',
            ManHour: 0,
          })
        this.props.loadcon()

        }).catch(error => {

          this.setState({
            CheckError: true,
            CheckSuccess: false,
            Message: error.message,
            loading: false,
          })
        })

      )
    } 
    if(this.props.formcontrol === 'edit'){

      const http = Axios.create({
        baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',

        },
      })

      return (

        http.post(`/Ticket/UpdateTicket`

          , {

            id: this.state.TicketID,

            description: this.state.TicketDesc,
            status: this.state.TicketStatus,
            comment: this.state.valueComments,
            estimateTime: this.state.ManHour,
          }
        ).then((ople) => {
          this.setState({
            CheckError: false,
            CheckSuccess: true,
            Message: 'Update Ticket complete',
            ManHour: 0,
            loading:false,
          })
          this.props.loadcon()
        }).catch(error => {
          this.setState({

            CheckError: true,
            CheckSuccess: false,
            Message: error.message,
          })
        })


      )



    }
  } else {
    console.log('name',this.state.TicketName)
    console.log('name',this.state.PriorityID)
    console.log('name',this.state.Typepick)

    this.setState({
      CheckError:true,
      CheckSuccess:false,
      Message:'Please Fill out Require field',
      loading:false,
    })
  }
  } 

  onChangeSTicketName = e => {
    this.setState({
      TicketName: e.target.value
    })

  }
  onChangeSDescription = e => {
    this.setState({
      TicketDesc: e.target.value
    })
  }
  onChangeSPriorityID = value => {
    this.setState({
      PriorityID: value
    })

  }
  onChangeSType = value => {
    this.setState({
      Typepick: value
    })


  }
  onChangeSStatus = value => {
    this.setState({
      TicketStatus: value
    })

  }
  onChangeStep = current => {
    this.setState({ current });
  };


  handleChange = e => {
    this.setState({
      valueComments: e.target.value,
    });
  };

  onChangeT = value => {

    this.setState({
      ManHour: value
    })
  }

  render() {

    const { submitting, current } = this.state;
    const options =
      this.state.Priovalue.map(Fdata =>
        <Option value={Fdata.id}  >{Fdata.priorityName}</Option>)

    const Statoptions =
      this.state.StatusList.map(Slist =>
        <Option value={Slist.valueKey} >{Slist.valueText}</Option>)

    const Typeoptions =
      this.state.TypeList.map(Tlist =>
        <Option value={Tlist.valueKey} >{Tlist.valueText} </Option>)
    return (

      <div>

        <Drawer
          title={this.props.titledraw}
          placement="right"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
          width='50%'

        >

          <Form

          >
            {/* Row 1 */}
            <Row gutter={16} type='flex' justify='start'>
              <Col span={24}>

                <Steps

                  size="small"


                >
                  <Step name='step1' status={this.state.StepStatus1} title="Get Requirement" disabled />
                  <Step status={this.state.StepStatus2} title="Open" disabled />
                  <Step status={this.state.StepStatus3} title="Test" disabled />
                  <Step status={this.state.StepStatus4} title="Close" disabled />
                </Steps>
              </Col>
            </Row>
            {/* Row 2 */}
            <Row gutter={16} type='flex' justify='center'>
              <Col span={12}>
                <Form.Item layout="horizontal" label="TicketName" required >

                  <Input type='text' name='TicketName'
                    required
                    readOnly={this.props.editStat}
                    onChange={this.onChangeSTicketName}
                    value={this.state.TicketName}
                 />
                </Form.Item>

              </Col>
              <Col span={12}>
                <Form.Item required layout="horizontal" label="Type" >
                  <Select
                    name='typeSel'
                    placeholder="Select Type"
                    
                    readOnly={this.props.editStat}

                    onChange={this.onChangeSType}
                    value={this.state.Typepick}
                  >
                    {Typeoptions}

                  </Select>


                </Form.Item>
              </Col>
            </Row>
            {/* Row 3 */}
            <Row gutter={16} type='flex' justify='center' >
              <Col span={12}>
                <Form.Item layout="horizontal" label="Ticket No." >

                  <Input type='text' name='TicketNo' readOnly

                    value={this.state.TicketNo}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item required name='PriorityItem' layout="horizontal" label="Priority" >
                  <Select
                    name='prioritySel'
                    placeholder="Select Priority"

                    disabled={this.props.editStat}

                    onChange={this.onChangeSPriorityID}
                    value={this.state.PriorityID}
                  >
                    {options}

                  </Select>

                </Form.Item>
              </Col>
            </Row>
            {/* Row 4 */}
            <Row gutter={16} type='flex' justify='center' >
              <Col span={12}>
                {this.props.titledraw !== 'Add Ticket' ? <Form.Item name='StatusItem' layout="horizontal" label="Status" >
                  <Select
                    placeholder="Select status"
                    required
                    disabled={this.props.disStat}
                    onChange={this.onChangeSStatus}
                    value={this.state.TicketStatus}
                  >
                    {Statoptions}
                  </Select>
                </Form.Item>
                  : null}
              </Col>
              <Col span={12}>

                {this.props.titledraw !== 'Add Ticket' ? <Form.Item layout="horizontal" label="Create Date" >


                  <p>{moment(this.state.CreTime).format('DD-MM-YYYY HH:mm')}</p>

                </Form.Item>
                  : null}
              </Col>
            </Row>
            {/* Row 5 */}
            <Row gutter={16} type='flex' justify='start' >
              <Col span={24}>
                {this.props.titledraw !== 'Add Ticket' ?
                  <Form.Item layout="horizontal" label="Estimate Time" style={{ width: '50%' }} >
                    <InputNumber type='text'
                      disabled=
                      {this.state.TicketStatus === 'GETREQ'
                        && this.props.formcontrol === 'edit'
                        && (this.props.authTokens.companyCode === '1000'
                        || this.props.authTokens.companyCode === '1001')
                        ? this.props.disEst : true}
                      onChange={this.onChangeT}
                      value={this.state.ManHour}
                      min={1}
                    />  Hour
                  </Form.Item>
                  : null}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name='DescriptionItem' layout="horizontal" label="Description" >
                  <TextArea rows={4} type='text' name='Description'
                    readOnly={this.props.titledraw === 'Show Ticket' ? true : false}
                    onChange={this.onChangeSDescription}
                    value={this.state.TicketDesc}

                  />
                </Form.Item>
              </Col>

            </Row>
            <Row gutter={16}>
              <Col span={24}>

                {!this.props.hidStat && this.props.titledraw !== 'Add Ticket'
                  ? <Form.Item label="Comment"  >



                    {this.state.CommentList.map(item =>

                      <li>
                        <Comment

                          avatar={item.isOwner
                            ? <Avatar icon="tag" /> :
                            <Avatar icon='tool' />}
                          author={item.isOwner
                            ? <p style={{ color: 'red' }}> {item.commentByName}</p>
                            : <p style={{ color: 'green' }}> {item.commentByName}</p>}
                          content={item.comment}
                          datetime={item.commentDate}
                        />


                      </li>

                    )}

                    {this.props.titledraw !== 'Add Ticket' && this.props.titledraw !== 'Show Ticket'
                      ?
                      <Editor

                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        submitting={submitting}
                        value={this.state.valueComments}
                        disable={this.props.editStat}
                      /> : null}
                  </Form.Item> : null}
              </Col>
            </Row>
            <Row gutter={16} type='flex' justify='end'>
              <Col pan={{ xs: 4, sm: 6, md: 8, lg: 10 }} >
                <Form.Item>
                  <Button type="primary"
                    block
                    hidden={this.props.hidButStat}
                    loading={this.state.loading}
                    htmlType="submit"
                    className="login-form-button"
                    onClick={(event) => this.handleOnSubmit(event)}

                  >
                    Submit
              </Button>

                </Form.Item>

              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item>
                  {this.state.CheckSuccess ? <Alert type='success' message={this.state.Message} /> : null}
                  {this.state.CheckError ? <Alert type='error' message={this.state.Message} /> : null}
                </Form.Item>
              </Col>
            </Row>

          </Form>

        </Drawer>

      </div>
    );
  }
}
export default Drawerplate;
