import React from 'react';
import TableIssue from '../../component/table';
import Ddraw1 from './drawer'

import { Tag, Divider, Icon, Button, Drawer } from 'antd';



const Issue = () => {
  const [data, setData] = React.useState([
    {
      key: '1',
      issue_title: 'test test',
      name: 'test test',
      address: 'New York No. 1 Lake Park',
      status: 'open',
    },
    {
      key: '2',
      issue_title: 'test test',
      name: 'test test',
      address: 'London No. 1 Lake Park',
      status: 'waitting',
    },
    {
      key: '3',
      issue_title: 'test test',
      name: 'test test',
      address: 'Sidney No. 1 Lake Park',
      status: 'close',
    },
  ]);
  
  const [column, setColumn] = React.useState([
    {
      title: 'Issue_title',
      dataIndex: 'issue_title',
      width: '60%',
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => {
        switch (status) {
          case 'waitting':
            return (
              <Tag color="yellow" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
            break;
          case 'open':
            return (
              <Tag color="red" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
            break;
          case 'close':
            return (
              <Tag color="blue" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span style={{ cursor: 'pointer' }}>
          <Icon type="search" height="50em" width="50em" />
          {' '}
          display
          {' '}
          {record.name}
        </span>
      ),
    },
  ]);


  return (
    [<TableIssue columns={column} data={data} />
    ,<Ddraw1 />]
    
  );
};

export default Issue;
