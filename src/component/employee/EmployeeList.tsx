import * as React from "react";
import {useEffect, useState} from "react";
import {Table} from 'antd';
import type {TableColumnsType, TableProps} from 'antd';
import {getAllEmployee} from "../api/api";
import {EmployeeType} from "../interfaces/interface";

type TableRowSelection<T> = TableProps<T>['rowSelection'];

const columns: TableColumnsType<EmployeeType> = [
    {
        title: 'Имя',
        dataIndex: 'firstName',
    },
    {
        title: 'lastName',
        dataIndex: 'lastName',
    },
    {
        title: 'Очество',
        dataIndex: 'middleName',
    },
    {
        title: 'Страна',
        dataIndex: 'country',
    },
    {
        title: 'Город',
        dataIndex: 'city',
    },
    {
        title: 'Телефон',
        dataIndex: 'number',
    },
];
const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeeType[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    useEffect(() => {
        getAllEmployee()
            .then(data => setEmployees(data))
    }, []);

    const rowSelection: TableRowSelection<EmployeeType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    return <Table rowSelection={rowSelection} columns={columns} dataSource={employees}/>;
}

export default EmployeeList