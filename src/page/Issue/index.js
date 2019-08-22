import React, { Component, useState, useEffect } from 'react';
import TableIssue from '../../component/table';

import { Tag, Button, Icon } from 'antd';
import Drawerplate from '../../component/drawerplate/index';
import Axios from 'axios';
import {useAuth} from '../../context/auth';
const Issue = () => {
  const {authTokens} = useAuth ();
  console.log('aa',authTokens)
  const [dis, setDis] = React.useState(false);
  const [hid, setHid] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [rowid, setRID] = React.useState(0);
  const [tickname, setTickname] = React.useState('');
  const [des, setDes] = React.useState('');
  const [prio, setPrio] = React.useState(0);
  const [stat, setStat] = React.useState('');
  const [tickno, setTickNo] = React.useState('');
  const [priorityList, setPriorityList] = React.useState([])
  const [data, setData] = React.useState();
  const [tableload, setLoadTable] = React.useState(true)

  useEffect(() => {
    Axios.get(
      '/Ticket/GetAllTicket', {
      }
    )
      .then((result) => {
        setData(result.data);
        console.log(data)
      })
      .catch(error => {
        console.log("error alert".error)
      })
  }, [])
  function onClickDisplay(record) {
    setShow(true);
    setDis(true);
    setHid(false);
    setRID(rowid + record.id);
    setTickname(record.ticketName);
    setDes(record.description);
    setPrio(prio + record.priorityId);
    setStat(record.status);
    setTickNo(record.ticketNo);
    console.log(record);
    console.log(record.id);
    console.log(record.priorityId);
    console.log(prio);
    console.log(rowid);
  }
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

      width: '10%',
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
      width: '5%',
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
      width: '15%',
      render: (text, record) => (
        <span style={{ cursor: 'pointer' }}
          // onClick={() => [setShow(true),setDis(true),setHid(false)] }>
          onClick={() => onClickDisplay(record)}>
          <Icon type="search" height="50em" width="50em" />
          {' '}
          display
          {' '}
          {record.description}
        </span>
      ),
    },
  ]);




  return (
    <React.Fragment>
      <Button type="primary" onClick={() => [setShow(true), setDis(false), setHid(true)]} >
        <Icon type="plus-circle" />Add
      </Button>
      <TableIssue columns={column} data={data} loading={tableload} />
      <Drawerplate visible={show} onClose={() => setShow(false)}
        disStat={dis}
        hidStat={hid}
        rowStat={rowid}
        desStat={des}
        ticknStat={tickname}
        prioStat={prio}
        statStat={stat}
        tickNoStat={tickno}
      />
    </React.Fragment>
  );
};

export default Issue;
