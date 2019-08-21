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
  List,
  Form,
} from 'antd';

import Axios from 'axios';

import moment from 'moment';


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
    value: '',
    StateticketName: '',
    Statedescription: '',
    StatepriorityId: 0,
    Statestatus: '',



  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  openticket = (event) => {
    event.preventDefault();
    Axios.post(
      '/Ticket/OpenTicket', {

        ticketName: this.state.StateticketName,
        description: this.state.Statedescription,
        priorityId: this.state.StatepriorityId,
        status: this.state.Statestatus,

      }
    ).then((ople) => {
      console.log("Success to Open ticket")
      console.log(this.state.Statedescription)

      //  Maybe not better way to do like this
      this.setState({
        StateticketName: '',
        Statedescription: '',
        StatepriorityId: 0,
        Statestatus: '',

      })
      event.preventDefault();
      //  


    }).catch(error => {
      console.log("error Open ticket".error)
    })

  }

  onChangeSTicketName = e => {
    this.setState({
      StateticketName: e.target.value
    })

  }
  onChangeSDescription = e => {
    this.setState({
      Statedescription: e.target.value
    })

  }
  onChangeSPriorityID = value => {
    this.setState({
      StatepriorityId: parseInt(value)
    })

  }
  onChangeSStatus = value => {
    this.setState({
      Statestatus: value
    })

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

    return (
      <div>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
          width='50%'
        >
          <Form
            onSubmit={this.openticket}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item layout="horizontal" label="Type" >

                  <Select defaultValue="K2" disabled={this.props.disStat} >
                    <Option value="1">K2</Option>
                    <Option value="2">F/O</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="horizontal" label="Priority">


                  <Select defaultValue="Low" disabled={this.props.disStat}
                    onChange={this.onChangeSPriorityID}
                  >
                    <Option value="1">Low</Option>
                    <Option value="2">Medium</Option>
                    <Option value="3">High</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="horizontal" label="TicketName" >

                  <Input type='text' name='TicketName' disabled={false}
                    onChange={this.onChangeSTicketName}
                    value={this.state.StateticketName}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item layout="horizontal" label="Status" >
                  <Select defaultValue="OPEN" disabled={false}
                    onChange={this.onChangeSStatus}
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
                    value={this.state.Statedescription}
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
