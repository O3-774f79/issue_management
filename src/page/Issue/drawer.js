import React, { useState } from 'react'

import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    Card,
    Col,
    Row,
    Alert,
    Drawer
} from 'antd'



export default class  Ddraw1 extends React.Component {

    state = { visible: false };

    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
  

    render(){
    return (
        <div>
            <Button onClick={this.showDrawer} > Show </Button>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
               
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
}
}