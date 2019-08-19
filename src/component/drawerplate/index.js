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
    dis: false,
    visible: false,
    comments: [],
    submitting: false,
    value: '',
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

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
          <Form>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item layout="horizontal" label="Type" >

                  <Select defaultValue="K2"  >
                    <Option value="1">K2</Option>
                    <Option value="2">F/O</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="horizontal" label="Priority">


                  <Select defaultValue="Low" disabled={false} >
                    <Option value="1">Low</Option>
                    <Option value="2">Medium</Option>
                    <Option value="2">High</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="horizontal" label="Name" >

                  <Input type='text' name='Inputname' disabled={false} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="horizontal" label="Tel." >

                  <Input type='text' name='InputTel' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="horizontal" label="Over" >

                  <Input type='text' name='InputOver' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="horizontal" label="Other" >

                  <Input type='text' name='Inputother' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>

                  {comments.length > 0 && <CommentList comments={comments} />}
                  <Comment
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
                      onClick={this.handleSubmit}

                    >
                      Submit
              </Button>

                  </Form.Item>
                </Col>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    );
  }
}
export default Drawerplate;
