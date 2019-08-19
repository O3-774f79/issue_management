import React from 'react';
import {Drawer} from 'antd';

const Test = props => {
  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={props.onClose}
        visible={props.visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};
export default Test;
