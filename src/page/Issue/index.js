import React, { Component, useState, useEffect } from 'react';
import TableIssue from '../../component/table';

import { Tag, Button, Icon } from 'antd';
import Drawerplate from '../../component/drawerplate/index';
import Axios from 'axios';

// const componentDidMount = () =>{
//         Axios.get(
//           'https://ticket-issue.herokuapp.com/api/Ticket/GetAllTicket',{

//           }
//         )
//         .then((result) =>{
//          this.setState({data: result.data}) 
//         }
//         )
//         .catch(error => {
//            console.log("error alert" .error)
//         })
// }




const Issue = () => {

  

  const [data, setData] = React.useState();
  useEffect(() => {
    Axios.get(
      '/Ticket/GetAllTicket',{
  
      }
    )
    .then((result) =>{
    setData(result.data);
     console.log(data)
    }
    )
    .catch(error => {
       console.log("error alert" .error)
    })

  },[])
  


  const [dis, setDis] = React.useState(false);
  const [hid, setHid] = React.useState(false);
  const [show, setShow] = React.useState(false);
  
  
  // const [data, setData] = React.useState([
  //   {
  //     key: '1',
  //     issue_title: 'test test',
  //     name: 'test test',
  //     address: 'New York No. 1 Lake Park',
  //     status: 'open',
  //   },
  //   {
  //     key: '2',
  //     issue_title: 'test test',
  //     name: 'test test',
  //     address: 'London No. 1 Lake Park',
  //     status: 'waitting',
  //   },
  //   {
  //     key: '3',
  //     issue_title: 'test test',
  //     name: 'test test',
  //     address: 'Sidney No. 1 Lake Park',
  //     status: 'close',




  //   },
  // ]);

  const [column, setColumn] = React.useState([
    {
      title: 'ticketName',
      dataIndex: 'ticketName',
      
      width: '20%',
      editable: true,
    },
    {
      title: 'ticketNo',
      dataIndex: 'ticketNo',
      width: '20%',
      editable: true,
    },
    {
      title: 'description',
      dataIndex: 'description',
      width: '40%',
    },
    {
      title: 'Priority',
      dataIndex: 'priorityId',
      width: '10%',
    },
    {
      title: 'Status',  
      key: 'status',
      width: '10%',
      dataIndex: 'status',
      render: status => {
        switch (status) {
          case 'WAITING':
            return (
              <Tag color="yellow" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
            break;
          case 'OPEN':
            return (
              <Tag color="red" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
            break;
          case 'CLOSE':
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
        <span style={{ cursor: 'pointer' }} onClick={() => [setShow(true),setDis(true),setHid(false),console.log({dis})] }>
          <Icon type="search" height="50em" width="50em"  />
          {' '}
          display
          {' '}
          {record.name}
        </span>
      ),
    },
  ]);


  return (

    <React.Fragment>
      <Button type="primary" onClick={() => [setShow(true),setDis(false),setHid(true),console.log({dis})]} >
      <Icon type="plus-circle" />Add
      </Button>
      <TableIssue columns={column} data={data} />
      <Drawerplate visible={show} onClose={() => setShow(false)}  
      disStat={dis} 
      hidStat={hid}
      />
    </React.Fragment>
  );
};

export default Issue;
