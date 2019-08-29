import React, { Component, useState, useEffect } from 'react';
import TableIssue from '../../component/table';

import { Tag, Button, Icon } from 'antd';
import Drawerplate from '../../component/drawerplate/index';
import Axios from 'axios';
import { useAuth } from '../../context/auth';
const Issue = () => {
  const { authTokens } = useAuth();
  console.log('aa', authTokens)
  const [tickNodis, setTickNodis] = React.useState(false);
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
  const [priorityName, setPriorityName] = React.useState("")
  const [data, setData] = React.useState();
  const [tableload, setLoadTable] = React.useState(true)
  const [titledraw, setTitledraw] = React.useState('');
  const [recordList, setRecord] = React.useState({})


  // Control form
  const [formcontrol, setformcontrol] = React.useState('');

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
  const onClickDisplay = async (record) => {
    await setRecord(record)
    await setPriorityName(record.priorityName)
    await setDis(true);
    await setHid(false);
    // await setRID(rowid + record.id);
    // await setTickname(record.ticketName);
    // await setDes(record.description);
    // await setPrio(prio + record.priorityId);
    // await setStat(record.status);
    // await setTickNo(record.ticketNo);
    await setTickNodis(true);
    await setTitledraw('Show Ticket');
    await setformcontrol('edit');
    await setShow(true);
  }

  function onClickAdd() {
    setShow(true);
    setDis(false);
    setHid(true);
    setTitledraw('Add Ticket');
    setTickNodis(true);

    setformcontrol('add');
    // setRID(0);
    // setTickname('');
    // setDes('');
    // setPrio('Low');
    // setStat('OPEN');
    // setTickNo('');

  }

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
      dataIndex: 'priorityName',
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
      <Button type="primary"
        // onClick={() => [setShow(true), setDis(false), setHid(true)]} 
        onClick={() => onClickAdd()}
      >
        <Icon type="plus-circle" />Add
      </Button>
      <TableIssue columns={column} data={data} loading={tableload} />
      <Drawerplate visible={show} onClose={() => setShow(false)}
        disStat={dis}
        hidStat={hid}
        // rowStat={rowid}
        // desStat={des}
        // TicketnameStat={tickname}
        // prioStat={prio}
        // statStat={stat}
        // TicketNoStat={tickno}
        // prioName={priorityName}
        // titledraw={titledraw}
        tickNodis={tickNodis}
        formcontrol={formcontrol}
        dataList={recordList}
      />
      <p>{JSON.stringify(recordList)}</p>
    </React.Fragment>
  );
};

export default Issue;
