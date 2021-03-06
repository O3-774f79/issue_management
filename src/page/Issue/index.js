import React, { Component, useState, useEffect } from 'react';
import TableIssue from '../../component/table';

import { Tag, Button, Icon, Row, Col } from 'antd';
import Drawerplate from '../../component/drawerplate/index';
import Axios from 'axios';
import { useAuth } from '../../context/auth';
import moment, { relativeTimeThreshold } from 'moment';
const Issue = () => {
  const { authTokens } = useAuth();

  const [dis, setDis] = React.useState(false);
  const [hid, setHid] = React.useState(false);
  const [hidbut, setHidbut] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const [disEst, setDisest] = React.useState(false);

  const [priorityName, setPriorityName] = React.useState("")
  const [data, setData] = React.useState();
  const [tableload, setLoadTable] = React.useState(false)
  const [titledraw, setTitledraw] = React.useState('');
  const [recordList, setRecord] = React.useState({})
  const [commentList, setCommentList] = React.useState([])

  const [pagination, setPagination] = React.useState({});

  const ButtonGroup = Button.Group;


  // Control form edit/add/display
  const [formcontrol, setformcontrol] = React.useState('');


  useEffect(() => {

    setLoadTable(true);

    setTimeout(() => {

    }, 1500);
    loadAll();

  },
    [loadAll])

  const loadAll = ((params = {}) => {

    setLoadTable(true);

    setTimeout(() => {

    }, 1500);
    if (authTokens.companyCode === '1000') {
      const http = Axios.create({

        baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',

        },
      })
      http.get(`/Ticket/GetAllTicket`
        , {
          data: {
            results: 10,
            ...params,
          }
        }
      )
        .then((result) => {
          const pagination = { ...pagination }
          pagination.total = 200;
          setData(result.data);
          setLoadTable(false);
          setPagination({ pagination })

        })
        .catch(error => {


        })
    } else if (authTokens.companyCode === '1001') {
      const http = Axios.create({

        baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',

        },
      })

      http.get(`/Ticket/GetAssignTicket`

        , {
          data: {
            results: 10,
            ...params,
          }
        }
      )
        .then((result) => {
          const pagination = { ...pagination }
          pagination.total = 200;
          setData(result.data);
          setLoadTable(false);
          setPagination({ pagination })
        })
        .catch(error => {

        })

    } else
    // if (authTokens.companyCode === '1002') 
    {
      const http = Axios.create({

        baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',

        },
      })

      // http.get(`/Ticket/GetList`
      http.get(`/Ticket/GetCompanyTicket`

        , {
          data: {
            results: 10,
            ...params,
          }
        }
      )
        .then((result) => {
          const pagination = { ...pagination }
          pagination.total = 200;
          setData(result.data);
          setLoadTable(false);
          setPagination({ pagination })
        })
        .catch(error => {

        })

    }

  })

  const onClickDisplay = async (record) => {
    const http = await Axios.create({

      baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',

      },
    })
    const comment =
      await http.get(`/Ticket/GetTicketComment?ticketId=${record.id}`

      )
    await setCommentList(comment.data)
    await setRecord(record)
    await setPriorityName(record.priorityName)
    await setDis(true);
    await setHid(false);
    await setHidbut(true);
    await setEdit(true);

    await setTitledraw('Show Ticket');
    await setformcontrol('display');
    await setShow(true);
    await setDisest(false);
  }
  const onClickEdit = async (record) => {
    const http = await Axios.create({

      baseURL: 'http://ams.leaderplanet.co.th/ticketApi/api',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',

      },
    })
    const comment =
      await http.get(`/Ticket/GetTicketComment?ticketId=${record.id}`

      )
    await setCommentList(comment.data)
    await setRecord(record)
    await setPriorityName(record.priorityName)
    await setDis(false);
    await setHid(false);
    await setHidbut(false);
    await setEdit(true);
    await setTitledraw('Edit Ticket');
    await setformcontrol('edit');
    await setShow(true);
    if (authTokens.companyCode === '1000' &&
      authTokens.companyCode === '1001') {
      await setDisest(true);
    } else {
      await setDisest(false);
    }
  }

  function onClickAdd() {
    setShow(true);
    setDis(false);
    setHid(true);
    setHidbut(false);
    setTitledraw('Add Ticket');
    setEdit(false);
    setformcontrol('add');
    setDisest(false);

    setRecord('');

  }

  const loadcon = () => {
    setLoadTable(true)
    setShow(false)
    setTimeout(() => {
    });
    loadAll();
  }


  function Reload() {
    loadAll()
  }

  const onChangeTable = (pagination, filters, sorter) => {
    const pager = { ...pagination };
    pager.current = pagination.current;
    setPagination({ pager })
    loadAll({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });

  }



  const [column, setColumn] = React.useState([

    {
      title: 'Ticket Number',
      dataIndex: 'ticketNo',
      width: '20%',

    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '35%',
    },
    {
      title: 'Priority',
      dataIndex: 'priorityName',
      width: '5%',
      filters: [{
        text: 'Low',
        value: 'Low'
      },
      {
        text: 'Medium',
        value: 'Medium'
      },
      {
        text: 'High',
        value: 'High'
      },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.priorityName.indexOf(value) === 0,
      render: priorityName => {
        switch (priorityName) {

          case 'High':
            return (
              <Tag color="red" key={priorityName}>
                {priorityName.toUpperCase()}
              </Tag>
            );
            break;
          case 'Medium':
            return (
              <Tag color="gold" key={priorityName}>
                {priorityName.toUpperCase()}
              </Tag>
            );
            break;
          case 'Low':
            return (
              <Tag color="blue" key={priorityName}>
                {priorityName.toUpperCase()}
              </Tag>
            );
        }
      },
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      width: '15%',

      render: function (text, record) {
        var str = record.createDate

        return moment(str).subtract(10, 'days').calendar();
      }
    },
    {
      title: 'Online Time',
      dataIndex: 'onlineTime',
      width: '5%',
      sorter: (a, b) => a.onlineTime - b.onlineTime,
      sortDirections: ['ascend', 'descend'],
      render: function (text, record) {
        var str = record.onlineTime

        var days = Math.floor(str / 1440);
        var htd = (days * 1440)
        var hours = Math.floor((str - htd) / 60);
        if (days < 1) {
          return hours + ' ชั่วโมง'
        } else {
          return days + ' วัน' + hours + ' ชั่วโมง'
        }
      }

    },
    {
      title: 'Status',
      key: 'status',
      width: '10%',
      dataIndex: 'status',
      filters: [
        {
          text: 'GETREQ',
          value: 'GETREQ'
        },
        {
          text: 'OPEN',
          value: 'OPEN'
        },
        {
          text: 'WAITING',
          value: 'WAITING'
        },
        {
          text: 'CLOSE',
          value: 'CLOSE'
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: status => {
        switch (status) {
          case 'GETREQ':
            return (
              <Tag color="#ccff33" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
            break;
          case 'OPEN':
            return (
              <Tag color="#f50" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
            break;
          case 'WAITING':
            return (
              <Tag color="#ffcc00" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
            break;

          case 'CLOSE':
            return (
              <Tag color="#87d068" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
        }
      },

    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        [

          <Button shape='circle'
            onClick={() => onClickDisplay(record)}
          >
            <Icon type="search" height="50em" width="50em" />


          </Button>
          ,


          <Button shape='circle'
            hidden={record.status === 'CLOSE' ? true : false}
            onClick={() => onClickEdit(record)}>

            <Icon type="edit" height="50em" width="50em" />

          </Button>
        ]
      ),
    },
  ]);




  return (
    <React.Fragment>

      <div>
        
            <Button type='primary' onClick={() => onClickAdd()}>
              <Icon type="plus-circle" />
              Add
        </Button>
        <span>{' '}</span>
            <Button onClick={() => Reload()} loading={tableload} >
              <Icon type="retweet" />
              Refresh
        </Button>
        
      </div>
      <TableIssue
        columns={column}
        data={data}
        loading={tableload}
        onchange={onChangeTable}

      />
      <Drawerplate visible={show} onClose={() => setShow(false)}
        disStat={dis}
        hidStat={hid}
        hidButStat={hidbut}
        editStat={edit}
        disEst={disEst}
        authTokens={authTokens}
        titledraw={titledraw}
        commentList={commentList}
        formcontrol={formcontrol}
        dataList={recordList}
        loadcon={loadcon}
        authTokens={authTokens}
      />

    </React.Fragment>
  );
};

export default Issue;
