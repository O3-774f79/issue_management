import React from 'react';
import {Table} from 'antd';

const TableIssue = props => (
    <Table  loading={props.loading} columns={props.columns} dataSource={props.data} />
);

export default TableIssue;
