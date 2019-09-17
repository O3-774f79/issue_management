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
} from 'antd';

import Axios from 'axios';
import moment, { relativeTimeThreshold } from 'moment';

import { useAuth } from '../../context/auth';

const { Option } = Select;
const { TextArea } = Input;



const Editor = ({ onChange, onSubmit, submitting, value, hidden }) => (
  <div>

    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
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
    CompanyList: [],
    StatusList: [],
    Company: '',
    StatepriorityName: '',
    data: [],
    dataList: {},
    valueComments: '',
    CommentList: [],
    Message: '',
    date: '',
    Time: 0,


  };

  componentDidMount() {


    const http = Axios.create({
      baseURL: 'http://139.180.130.44:50000/api',

      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${localStorage.getItem('UseTok')}`,
      },
    })

    http.get(`/Company/GetPartner`
      , {
      }
    )
      .then((getpart) => {
        this.setState({
          CompanyList: getpart.data,
        })

      })
      .catch(error => {
        console.log("Get partner Error");
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
  }



  componentWillReceiveProps(nextProps) {

    this.setState({
      valueComments: '',
      CheckSuccess: false,
      message: '',


    })

    if (this.props.dataList !== nextProps.dataList) {
      const http = Axios.create({
        baseURL: 'http://139.180.130.44:50000/api',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${localStorage.getItem('UseTok')}`,
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
        Company: nextProps.dataList.assignTo,
        Time: nextProps.dataList.onlineTime,

      })

      
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
    });
  };




  test = (e) => {

    this.handleOnSubmit(e)
  }

  handleOnSubmit = (event) => {

    event.preventDefault();
    this.setState({

      CheckError: false,
      CheckSuccess: false,
      Message: '',
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 3000);
    if (this.props.formcontrol === 'add') {
      const http = Axios.create({
        baseURL: 'http://139.180.130.44:50000/api',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${localStorage.getItem('UseTok')}`,
        },
      })
      return (

        http.post(`/Ticket/OpenTicket`
          , {

            ticketName: this.state.TicketName,
            description: this.state.TicketDesc,
            priorityId: this.state.PriorityID,
            assignTo: this.state.Company,
            status: 'OPEN',

          }
        ).then((ople) => {

          this.setState({
            TicketName: '',
            TicketDesc: '',
            PriorityID: 1,
            Company: 'Partner',
            status: 'OPEN',
            CheckError: false,
            CheckSuccess: true,
            loading: true,
            Message: 'Open Ticket complete'

          })
          this.props.loadcon()

        }).catch(error => {

          this.setState({
            CheckError: true,
            CheckSuccess: false,
            Message: error.message
          })
        })

      )
    } else {
      if (this.state.valueComments !== '') {
        const http = Axios.create({
          baseURL: 'http://139.180.130.44:50000/api',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
            Authorization: `Bearer ${localStorage.getItem('UseTok')}`,
          },
        })
        return (


          http.post(`/Ticket/UpdateTicket`
            , {


              id: this.state.TicketID,
              // ticketNo: this.state.TicketNo,
              // ticketName: this.state.TicketName,
              // description: this.state.TicketDesc,
              // priorityId: this.state.PriorityID,
              // priorityName: this.state.PriorityName,
              status: this.state.TicketStatus,
              comment: this.state.valueComments,
              datetime: moment().format('YYYY MM DD'),
              // companycode: '1000',
            }
          ).then((ople) => {
            http.get(`/Ticket/GetTicketComment?ticketId=${this.state.TicketID}`
            )
              .then((ResComment) => {
                this.setState({
                  CommentList: ResComment.data,
                })

              })
              .catch(error => {
              }
              )


            this.setState({
              valueComments: '',

            })



          }).catch(error => {
          })


        )
      } else {
        const http = Axios.create({
          baseURL: 'http://139.180.130.44:50000/api',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
            Authorization: `Bearer ${localStorage.getItem('UseTok')}`,
          },
        })
        return (

          http.post(`/Ticket/UpdateTicket`

            , {


              id: this.state.TicketID,
              // ticketNo: this.state.TicketNo,
              // ticketName: this.state.TicketName,
              description: this.state.TicketDesc,
              // priorityId: this.state.PriorityID,
              // priorityName: this.state.PriorityName,
              status: this.state.TicketStatus,
              // comment: this.state.valueComments,
              // companycode: '1000',
            }
          ).then((ople) => {
            this.setState({
              CheckError: false,
              CheckSuccess: true,
              Message: 'Update Ticket complete'
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
  onChangeSCompany = value => {
    this.setState({
      Company: value
    })


  }
  onChangeSStatus = value => {
    this.setState({
      TicketStatus: value
    })

  }



  handleChange = e => {
    this.setState({
      valueComments: e.target.value,
    });

  };
  render() {

    const { submitting,  } = this.state;
    const options =
      this.state.Priovalue.map(Fdata =>
        <Option value={Fdata.id}  >{Fdata.priorityName}</Option>)

    const Partoptions =
      this.state.CompanyList.map(partner =>
        <Option value={partner.companyCode}  >{partner.companyName}</Option>)

    const Statoptions =
      this.state.StatusList.map(Slist =>
        <Option value={Slist.valueKey} >{Slist.valueText}</Option>)

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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item layout="horizontal" label="TicketName" >

                  <Input type='text' name='TicketName'
                    disabled={this.props.disStat}
                    onChange={this.onChangeSTicketName}
                    value={this.state.TicketName}

                  />
                </Form.Item>

              </Col>

              <Col span={12}>
                <Form.Item layout="horizontal" label="Ticket No." >

                  <Input type='text' name='TicketNo' disabled

                    value={this.state.TicketNo}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item layout="horizontal" label="Assign To" >
                  <Select
                    name='companySel'
                    placeholder="Select Company"

                    disabled={this.props.disStat}

                    onChange={this.onChangeSCompany}
                    value={this.state.Company}
                  >
                    {Partoptions}

                  </Select>

                </Form.Item>
              </Col>



              <Col span={12}>
                <Form.Item name='PriorityItem' layout="horizontal" label="Priority" >
                  <Select
                    name='prioritySel'
                    placeholder="Select Priority"

                    disabled={this.props.disStat}

                    onChange={this.onChangeSPriorityID}
                    value={this.state.PriorityID}
                  >
                    {options}

                  </Select>

                </Form.Item>
              </Col>

              <Col span={12}>
                {this.props.titledraw !== 'Add Ticket' ? <Form.Item name='StatusItem' layout="horizontal" label="Status" >
                  <Select
                    placeholder="Select status"

                    disabled={this.props.hidStat}
                    onChange={this.onChangeSStatus}
                    value={this.state.TicketStatus}
                  >
                    {Statoptions}
                  </Select>
                </Form.Item>
                  : null}
              </Col>
              <Col span={12}>
                {this.props.titledraw !== 'Add Ticket' ? <Form.Item layout="horizontal" label="Time" >

                  <TimePicker value={moment.unix(this.state.Time)} disabled={this.props.visible} />
                </Form.Item>
                  : null}
              </Col>

              <Col span={24}>
                <Form.Item name='DescriptionItem' layout="horizontal" label="Description" >
                  <TextArea rows={4} type='text' name='Description'
                    disabled={this.props.disStat}
                    onChange={this.onChangeSDescription}
                    value={this.state.TicketDesc}

                  />
                </Form.Item>
              </Col>



              <Col span={24}>
                <div  >
                  {!this.props.hidStat ? <Form.Item label="Comment"  >



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


                    <Editor

                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={this.state.valueComments}
                    />
                  </Form.Item> : null}
                  <Col span={4}></Col>
                  <Col span={4}></Col>
                  <Col span={4}>{}</Col>
                  <Col span={4}></Col>
                  <Col span={4}></Col>
                  <Col span={4}>
                    <Form.Item>
                      <Button type="primary"
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
                  <Col span={24}>
                    <Form.Item>
                      {this.state.CheckSuccess ? <Alert type='success' message={this.state.Message} /> : null}
                      {this.state.CheckError ? <Alert type='error' message={this.state.Message} /> : null}
                    </Form.Item>
                  </Col>
                </div>
              </Col>
            </Row>
          </Form>

        </Drawer>

      </div>
    );
  }
}
export default Drawerplate;
