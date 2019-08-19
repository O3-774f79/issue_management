import React from 'react';
import {Drawer, Button} from 'antd';

class Test extends React.Component {
  state = {visible: false};

  onClose = () => {
    this.setState ({
      visible: false,
    });
  };

  render () {
    return (
      <div>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}
export default Test;
