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
} from 'antd';

import Axios from 'axios';
import moment, { relativeTimeThreshold } from 'moment';


const { Option } = Select;
const { TextArea } = Input;


const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

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
    // value: '',
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
    commentsList: [],
    CommentList: []


  };

  componentDidMount() {
    console.log(`lisaaaaaaaaaaaaaaaaaaaaaat`, this.props.dataList)
    Axios.get(
      '/Priority/GetList', {
      },
    )
      .then((result) => {
        this.setState({
          Priovalue: result.data,
        })
        console.log("Ceeeeeeeeeeeeeeb", result.data)
        console.log(this.state.Priovalue)
      })
      .catch(error => {
        console.log("Error From Board PAge".error)

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
            commentsList: ResComment.data
          })
        })
        .catch(error => {
          console.log("Error Comment".error)
        }
        )
    }
  }


  onClose = () => {
    this.setState({
      visible: false,
    });
  };






  handleOnSubmit = (event) => {
    event.preventDefault();
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
          console.log("Success to Open ticket")
          this.setState({
            TicketName: '',
            TicketDesc: '',
            PriorityID: 1,
            status: 'OPEN',

          })

          // event.preventDefault();

        }).catch(error => {
          console.log("error Open ticket".error)
        })

      )
    } else {
      return (
        console.log("Update"),
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
          console.log("Success to Update ticket")
          // console.log(this.state.TicketDesc)
          console.log(this.state.valueComments)
        }).catch(error => {
          console.log("error Update ticket".error)
        })


      )
    }
  }


  onChangeSTicketName = e => {
    this.setState({
      TicketName: e.target.value
    })
    console.log(this.state.TicketName)

  }
  onChangeSDescription = e => {
    this.setState({
      TicketDesc: e.target.value
    })
    console.log(this.state.TicketDesc)

  }
  onChangeSPriorityID = value => {
    this.setState({
      PriorityID: value
    })

    console.log("Select ID ", value)

  }
  onChangeSStatus = value => {
    this.setState({
      TicketStatus: value
    })
    console.log('status is ', this.state.TicketStatus)

  }

  handleSubmit = () => {
    if (!this.state.valueComments) {
      return;
    }

    this.setState({
      submitting: true,
    }); setTimeout(() => {
      this.setState({
        submitting: false,
        valueComments: '',
        comments: [
          {
            // author: this.props.AuthTokens,
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
    console.log("Show com", this.state.commentsList)


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
                <Form.Item layout="horizontal" label="Type" >

                  <Select name='typeSel' defaultValue="K2" disabled={this.props.disStat} >
                    <Option value="1">K2</Option>
                    <Option value="2">F/O</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="horizontal" label="Priority">


                  <Select
                    name='prioritySel'
                    placeholder="Select Priority"

                    disabled={this.props.disStat}
                    // disabled={false}
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
                    // value={this.props.tickNoStat}
                    value={this.state.TicketNo}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="horizontal" label="TicketName" >

                  <Input type='text' name='TicketName' disabled={false}
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
                <Form.Item layout="horizontal" label="Other" >

                  <Input type='text' name='Inputother' />
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
                  <Form.Item>

                    {comments.length > 0 && <CommentList comments={comments} />}
                    {/* {this.state.CommentList ? <h1>{JSON.stringify(this.state.CommentList)}</h1> : <h1>false</h1>} */}
                    {this.state.CommentList.map(item => <li>
                      <Comment hidden={this.props.hidStat}
                        author={item.commentByName}
                        content={item.comment}
                        />
                        
                    
                    </li>)}
                   
                      <Editor
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        submitting={submitting}
                        value={this.state.valueComments}
                      />
                  </Form.Item>
                      <Col span={4}></Col>
                      <Col span={4}></Col>
                      <Col span={4}></Col>
                      <Col span={4}></Col>
                      <Col span={4}></Col>
                      <Col span={4}>
                        <Form.Item>
                          <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                          // onClick={this.openticket}

                          >
                            Submit
              </Button>

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
