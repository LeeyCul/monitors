import React, { useState } from 'react';
import { Divider } from 'antd';
import TableListCardPage from '@/components/tableListCardPage';
import ModalForm from './modalForm';

function index() {
    const [visible, setVisible] = useState<Boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '绑定角色',
            dataIndex: 'jiaose',
            key: 'jiaose',
        },
        {
            title: '手机号码',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '真实姓名',
            dataIndex: 'rename',
            key: 'rename',
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
            name: '测试1',
            jiaose: '测试1',
            ip: 18483226955,
            rename: '李先生',
            id: '1',
        },
        {
            name: '测试2',
            jiaose: '测试2',
            ip: 18483226995,
            rename: '李先生',
            id: '1',
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
        console.log('object :>> ', value);
        setVisible(false);
    };

    return (
        <div>
            <TableListCardPage
                columns={columns}
                dataSource={dataSource}
                title="人员管理"
                queryName="人员名称"
                handleQuery={handleQuery}
                add={() => setVisible(true)}
                lotSizeDel={lotSizeDel}
            />
            <ModalForm
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={() => setVisible(false)}
                onCreate={handleCreate}
            />
        </div>
    );
}

export default index;
