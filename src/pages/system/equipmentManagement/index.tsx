import React, { useState } from 'react';
import { useHistory } from 'umi'
import { Divider } from 'antd';
import TableListCardPage from '@/components/tableListCardPage';

function index() {
    const [visible, setVisible] = useState<Boolean>(false);
    const history = useHistory()
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            width: 200,
            render: (record: any) => {
                return (
                    <span>
                        <span>编辑</span>
                        <Divider type="vertical" />
                        <span
                            onClick={() => {
                                handleSigleDel(record);
                            }}
                        >
                            删除
                        </span>
                    </span>
                );
            },
        },
    ];

    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    function handleQuery(keyWords: string) {
        console.log('keyWords', keyWords);
    }

    function lotSizeDel(value: any[]) {
        console.log(value);
    }

    function handleSigleDel(record: any) {
        console.log('va', record);
    }

    return (
        <TableListCardPage
            columns={columns}
            selectable={true}
            dataSource={dataSource}
            title="设备管理"
            queryName="人员名称"
            handleQuery={handleQuery}
            add={() => history.push('/equipment/add')}
            lotSizeDel={lotSizeDel}
        />
    );
}

export default index;
