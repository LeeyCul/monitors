import React, { useState, useRef } from 'react';
import { Divider, Modal } from 'antd';
import TableListCardPage from '@/components/tableListCardPage';
import CollectionCreateForm from './modalFrom'

function index() {
    const getFormValue = useRef();
    const [visible, setVisible] = useState<boolean>(false);
    const [a, setA] = useState<any>()
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
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
                        <span style={styles.action}>编辑</span>
                        <Divider type="vertical" />
                        <span
                            style={styles.action}
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

    const handleCreate = (value: any) => {
        if (value) {
            console.log('object :>> ', value);
            setVisible(false)
        }
    }



    return (
        <div>
            <TableListCardPage
                columns={columns}
                dataSource={dataSource}
                title="权限管理"
                queryName="人员名称"
                handleQuery={handleQuery}
                add={() => setVisible(true)}
                lotSizeDel={lotSizeDel}
            />

            <CollectionCreateForm
                wrappedComponentRef={getFormValue}
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={() => setVisible(false)}
                onCreate={handleCreate}
            />


        </div>
    );
}

const styles = {
    action: {
        color: '#53A8E2',
        cursor: 'pointer'
    }
}

export default index;
