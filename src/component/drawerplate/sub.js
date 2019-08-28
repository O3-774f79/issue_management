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

import moment from 'moment';

const sub = props => {


  const [disabledStat, setDisabled] = useState(false);
  const [hiddenStat, setHidden] = useState(false);
  const [visibleStat, setVisible] = useState(false);
  const [comments, setComment] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [StateID, setStateID] = useState('');
  const [StateticketName, setTicketname] = useState('');
  const [Statedescription, setDescription] = useState('');
  const [Statestatus, setStatus] = useState('');
  const [StatepriorityId, setPriorityID] = useState(0);
  const [StatepriorityName, setPriorityName] = useState('');

  
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

  useEffect(() => {
    Axios.get(
      '/Priority/GetList', {

      },
    )
      .then((result) => {


        console.log("Ceeeeeeeeeeeeeeb", result.data)




      })
      .catch(error => {
        // this.setState({error:"Username or Password incorrect"})
        console.log("Error From Board PAge".error)

      }
      )
  }, [])

  const handleSubmit = () => {
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
                  // defaultValue={this.state.StatepriorityaName} 
                  disabled={this.props.disStat}
                  onChange={this.onChangeSPriorityID}
                // value={this.props.prioName}
                // value={this.state.StatepriorityName}
                >
                  <Option value="0">Low</Option>
                  <Option value="1">Medium</Option>
                  <Option value="2">High</Option>
                  {/* {options} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item layout="horizontal" label="Ticket No." >

                <Input type='text' name='TicketNo' disabled={this.props.tickNodis}
                // value={this.props.tickNoStat}
                // value={this.state.StateticketName}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item layout="horizontal" label="TicketName" >

                <Input type='text' name='TicketName' disabled={false}
                  onChange={e => setTicketname(e.target.value)}
                  value={StateticketName}
                // value={this.props.ticknStat}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item layout="horizontal" label="Status" >
                <Select
                  placeholder="Select status"
                  // defaultValue="Status" 
                  disabled={false}
                  onChange={this.onChangeSStatus}
                  // value={this.props.statStat}
                  value={this.state.Statestatus}
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
                // value={this.props.desStat}
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
  )
}
export default sub