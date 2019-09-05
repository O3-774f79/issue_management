import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Button,
  Input,
  Col,
  Row,
  Select,
  Comment,
  Avatar,
  List,
  Form,
  Divider,
  Icon,
  Alert,
} from 'antd';

import Axios from 'axios';
import moment, { relativeTimeThreshold } from 'moment';



const { Option } = Select;
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>

    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);


class Drawerplate extends React.Component {

  state = {
    openDrawer: false,

    disabledStat: false,
    hiddenStat: false,
    visible: false,
    comments: [],
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
    TicketStatus: '',
    Priovalue: [],
    StatepriorityName: '',
    data: [],
    dataList: {},
    valueComments: '',
    CommentList: [],
    Message: '',


  };

  componentDidMount() {

    Axios.get(
      '/Priority/GetList', {
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
  }



  componentWillReceiveProps(nextProps) {

    if (this.props.dataList !== nextProps.dataList) {
      this.setState({
        TicketID: nextProps.dataList.id,
        TicketNo: nextProps.dataList.ticketNo,
        TicketName: nextProps.dataList.ticketName,
        TicketDesc: nextProps.dataList.description,
        PriorityID: nextProps.dataList.priorityId,
        TicketStatus: nextProps.dataList.status,
        CommentList: nextProps.commentList
      })
      Axios.get(
        `/Ticket/GetTicketComment?ticketId=${nextProps.dataList.id}`)
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
      CommentList: [],
    });
  };






  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      CheckError: false,
      CheckSuccess: false,
      Message: '',
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 3000);
    if (this.props.disStat === false) {
      return (
        Axios.post(
          '/Ticket/OpenTicket', {

            ticketName: this.state.TicketName,
            description: this.state.TicketDesc,
            priorityId: this.state.PriorityID,
            status: this.state.TicketStatus,

          }
        ).then((ople) => {

          this.setState({
            TicketName: '',
            TicketDesc: '',
            PriorityID: 1,
            status: 'OPEN',
            CheckError: false,
            CheckSuccess: true,
            Message: 'Open Ticket complete'

          })


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
        return (



          Axios.post(
            '/Ticket/UpdateTicket', {


              id: this.state.TicketID,
              // ticketNo: this.state.TicketNo,
              // ticketName: this.state.TicketName,
              // description: this.state.TicketDesc,
              // priorityId: this.state.PriorityID,
              // priorityName: this.state.PriorityName,
              status: this.state.TicketStatus,
              comment: this.state.valueComments,
              // companycode: '1000',
            }
          ).then((ople) => {


            Axios.get(
              `/Ticket/GetTicketComment?ticketId=${this.state.TicketID}`)
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
        return (


          Axios.post(
            '/Ticket/UpdateTicket', {


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
  onChangeSStatus = value => {
    this.setState({
      TicketStatus: value
    })

  }

  handleSubmit = () => {
    if (!this.state.valueComments) {
      return;
    }

    this.setState({
      submitting: true,
    });
    setTimeout(() => {
      this.setState({
        submitting: false,
        valueComments: '',
        comments: [
          {
            content: <p>{this.state.valueComments}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      valueComments: e.target.value,
    });

  };
  render() {


    const { comments, submitting, value } = this.state;
    const options =
      this.state.Priovalue.map(Fdata =>
        <Option value={Fdata.id}>{Fdata.priorityName}</Option>)


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
            onSubmit={this.handleOnSubmit}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item layout="horizontal" label="Priority" >
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
                <Form.Item layout="horizontal" label="Ticket No." >

                  <Input type='text' name='TicketNo' disabled={this.props.tickNodis}

                    value={this.state.TicketNo}
                  />
                </Form.Item>
              </Col>
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
                <Form.Item layout="horizontal" label="Status" >
                  <Select
                    placeholder="Select status"
                    defaultValue="OPEN"
                    disabled={false}
                    onChange={this.onChangeSStatus}
                    value={this.state.TicketStatus}
                  >
                    <Option value="OPEN">Open</Option>
                    <Option value="WAITING">Waiting</Option>
                    <Option value="CLOSE">Closed</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="horizontal"  >


                </Form.Item>
              </Col>
              <Col span={12}>
              </Col>

              <Col span={24}>
                <Form.Item layout="horizontal" label="Description" >
                  <TextArea rows={4} type='text' name='Description'
                    onChange={this.onChangeSDescription}
                    value={this.state.TicketDesc}

                  />
                </Form.Item>
              </Col>



              <Col span={24}>
                <div  >
                  <Form.Item label="Comment">



                    {this.state.CommentList.map(item =>

                      <li>
                        <Comment
                          hidden={this.props.hidStat}
                          avatar={<Avatar src='../../../src/img/user.png' />}
                          author={item.commentByName}
                          content={item.comment}

                        />


                      </li>

                    )}


                    <Editor
                      hidden={this.props.hidStat}
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={this.state.valueComments}
                    />
                  </Form.Item>
                  <Col span={4}></Col>
                  <Col span={4}></Col>
                  <Col span={4}>{}</Col>
                  <Col span={4}></Col>
                  <Col span={4}></Col>
                  <Col span={4}>
                    <Form.Item>
                      <Button type="primary"
                        loading={this.state.loading}
                        htmlType="submit"
                        className="login-form-button"

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
