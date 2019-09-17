import React from 'react';
import {Badge, Icon, List, Avatar, Dropdown} from 'antd';

const NotificationRight = props => {
  const menu = (
    <List
      style={{width: ''}}
      dataSource={[
        {
          name: 'Lily',
        },
        {
          name: 'Lily',
        },
      ]}
      bordered
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            // <a onClick={this.showDrawer} key={`a-${item.id}`}>
            <span>
              View Profile
            </span>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
            }
            title={<div>{item.name}</div>}
            description={"teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"}
          />
          {item.name}
        </List.Item>
      )}
    />
  );
  return (
    <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: 5,
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        <Badge count={props.topic || 0} showZero>
          <Icon type="bell" style={{fontSize: '30px'}} />
        </Badge>
      </div>
    </Dropdown>
  );
};
export default NotificationRight;
