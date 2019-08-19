import React from 'react';
import {Badge, Icon} from 'antd';

const NotificationRight = props => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      marginRight: 5,
      color: '#fff',
    }}
  >
    <Badge count={props.topic || 0} showZero>
      <Icon type="bell" style={{fontSize: '30px'}} />
    </Badge>
  </div>
);
export default NotificationRight;
