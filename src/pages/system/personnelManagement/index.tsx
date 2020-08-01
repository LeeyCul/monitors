import React, { useState, useRef } from 'react';
import { Divider, Popconfirm } from 'antd';
import { connect } from 'umi';
import TableListCardPage from '@/components/tableListCardPage';
import ModalForm from './modalForm';
import { UserState } from '@/models/user';

function index({ dispatch, data, loading, confirmLoading, roleList }: any) {
    const [visible, setVisible] = useState<Boolean>(false);
    const [editOrAdd, setEditOrAdd] = useState<string>('add');
    const [editId, setEditId] = useState<number | null>(null);
    const { list, pager } = data;
    const modalFormRef: any = useRef();
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '绑定角色',
            dataIndex: 'roleId',
            key: 'roleId',
            render: (roleId: number) => {
                const len = Array.isArray(roleList) ? roleList.length : 0;
                for (let i = 0; i < len; i++) {
                    if (roleList[i]['id'] === roleId) {
                        return <span>{roleList[i]['name']}</span>;
                    }
                }
            },
        },
        {
            title: '手机号码',
            dataIndex: 'iphone',
            key: 'iphone',
            render: (item: any, record: any) => {
                const { extra } = record || {};
                const { iphone } = extra || {};
                return <span>{iphone || '-'}</span>;
            },
        },
        {
            title: '真实姓名',
            dataIndex: 'extra',
            key: 'extra',
            render: (item: any) => {
                const { realName } = item || {};
                return <span>{realName || '-'}</span>;
            },
        },
        {
            title: '操作',
            width: 200,
            align: 'center',
            render: (record: any) => {
                return (
                    <span>
                        <span
                            style={styles.action}
                            onClick={() => handleEdit(record)}
                        >
                            编辑
                        </span>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="您确定要取消吗?"
                            onConfirm={() => {
                                handleSigleDel(record.id);
                            }}
                            okText="确定"
                            cancelText="取消"
                        >
                            <span style={styles.action}>删除</span>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    function handleEdit(record: any) {
        const { setVal } = modalFormRef.current;
        const { username, id, roleId, extra } = record;
        const { iphone, realName } = extra || {};
        setEditOrAdd('edit');
        setVal({
            username,
            roleId,
            iphone: iphone || '',
            realName: realName || '',
        });
        setEditId(id);
        setVisible(true);
    }

    function handleQuery(keyWords: string) {
        console.log('keyWords', keyWords);
    }

    function handleSigleDel(id: number) {
        dispatch({ type: 'user/delUser', payload: id });
    }

    const handleCreate = () => {
        const { getVal, resetForm } = modalFormRef.current;

        getVal((err: any, values: any) => {
            if (!err) {
                const { username, password, roleId, iphone, realName } = values;
                const addVal = {
                    username,
                    password,
                    roleId: roleId,
                    extra: { iphone, realName },
                };
                const editObj = Object.assign({}, addVal, { id: editId });
                if (editOrAdd === 'add') {
                    dispatch({ type: 'user/addUser', payload: addVal });
                } else {
                    dispatch({ type: 'user/updateUser', payload: editObj });
                }
                resetForm();
                !confirmLoading && setVisible(false);
            }
        });
    };

    return (
        <div>
            <TableListCardPage
                loading={loading}
                columns={columns}
                dataSource={list}
                title="人员管理"
                queryName="人员名称"
                handleQuery={handleQuery}
                add={() => {
                    setVisible(true);
                    setEditOrAdd('add');
                }}
            />
            <ModalForm
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    const { resetForm } = modalFormRef.current;
                    resetForm();
                    setVisible(false);
                }}
                roleList={roleList}
                onCreate={handleCreate}
                isRequired={editOrAdd === 'edit' ? false : true}
                wrappedComponentRef={modalFormRef}
                title={editOrAdd === 'edit' ? '编辑人员' : null}
            />
        </div>
    );
}

const styles = {
    action: {
        color: '#53A8E2',
        cursor: 'pointer',
    },
};
const mapStateToProps = ({
    user,
    loading,
}: {
    user: UserState;
    loading: any;
}) => {
    return {
        data: user.data,
        roleList: user.roleList,
        loading: loading.effects['user/getUserList'],
        confirmLoading: loading.effects['user/addUser'],
    };
};

export default connect(mapStateToProps)(index);
