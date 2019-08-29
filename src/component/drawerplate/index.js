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
    value: undefined,


  };

  componentDidMount() {
    console.log(`lisaaaaaaaaaaaaaaaaaaaaaat`, this.props.dataList)
    // this.setState({
    //   disabledStat: true,
    //   hiddenStat: false,
    //   TicketNo: this.props.TicketNoStat,
    //   TicketName: this.props.TicketnameStat,
    //   TicketDesc: this.props.desStat,
    //   TicketID: this.props.rowStat,
    //   PriorityID: this.props.prioStat,
    //   PriorityName: this.props.prioName,
    //   TicketStatus: this.props.statStat,
    //   dataList:this.props.dataList
    // })
    // if (this.props.formcontrol === 'add') {

    //   this.setState({
    //     disabledStat: false,
    //     hiddenStat: true,
    //     TicketNo: '',
    //     TicketID: 0,
    //     TicketName: '',
    //     TicketDesc: '',
    //     PriorityID: 0,
    //     PriorityName:'Low',
    //     TicketStatus: '',


    //   })
    //   console.log('add props')
    //   console.log(this.state.TicketNo)
    //   console.log(this.state.TicketName)
    //   console.log(this.state.TicketDesc)
    //   console.log(this.state.TicketStatus)

    // } else if( this.props.formcontrol === 'edit') {
    //   this.setState({
    //     disabledStat: true,
    //     hiddenStat: false,
    //    



    //   })
    // }

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
        // this.setState({error:"Username or Password incorrect"})
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
        // PriorityName: nextProps.dataList.priorityName,
        TicketStatus: nextProps.dataList.status,

      })

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
        console.log("Else"),
        Axios.post(
          '/Ticket/UpdateTicket', {
            id: this.state.TicketID,
            // ticketNo: this.state.TicketNo,
            ticketName: this.state.TicketName,
            description: this.state.TicketDesc,
            priorityId: this.state.PriorityID,
            priorityName: this.state.PriorityName,
            status: this.state.TicketStatus,
            comments: '',
            // companycode: '1000',
          }
        ).then((ople) => {
          console.log("Success to Update ticket")
          console.log(this.state.TicketDesc)
          console.log(this.state.TicketName)




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
   
    console.log("Select ID ",value)

  }
  onChangeSStatus = value => {
    this.setState({
      TicketStatus: value
    })
    console.log('status is ', this.state.TicketStatus)

  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    }); setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
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
          <p>aa{JSON.stringify(this.state.dataList)}</p>
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
                    
                    // disabled={this.props.disStat}
                    disabled={false}
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
                    <Comment hidden={this.props.hidStat}
                      avatar={
                        <Avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          alt="Han Solo"
                        />
                      }
                      content={
                        <Editor
                          onChange={this.handleChange}
                          onSubmit={this.handleSubmit}
                          submitting={submitting}
                          value={value}
                        />
                      }
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
