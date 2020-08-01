import React, { useState, useRef } from 'react';
import { Divider, message } from 'antd';
import { connect } from 'umi';
import TableListCardPage from '@/components/tableListCardPage';
import CollectionCreateForm from './modalFrom';
import moment from 'moment';

function index({ data, resourceList, resource, dispatch, loading }: any) {
    const modalFormRef: any = useRef();
    const [visible, setVisible] = useState<boolean>(false);
    const [editOrAdd, setEditOrAdd] = useState<string>('');
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | string | null>(null);
    const { list, pager } = data;
    const columns = [
        {
            title: '角色ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item: any) => (
                <span>{moment(item).format('YYYY-MM-DD')}</span>
            ),
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
                        <span
                            style={styles.action}
                            onClick={() => {
                                handleSigleDel(record.id);
                            }}
                        >
                            删除
                        </span>
                    </span>
                );
            },
        },
    ];

    function handleEdit(record: any) {
        const { setVal } = modalFormRef.current;
        const { resource, name, id } = record;
        setVal({ name });
        setVisible(true);
        setEditOrAdd('edit');
        setEditId(id);
        dispatch({ type: 'auth/setRoleCheckList', payload: resource });
    }

    function handleQuery(keyWords: string) {
        console.log('keyWords', keyWords);
    }

    function handleSigleDel(id: number) {
        dispatch({ type: 'auth/delRole', payload: id });
    }

    const handleCreate = () => {
        const { getVal, resetForm } = modalFormRef.current;

        getVal((err: any, values: any) => {
            if (!err) {
                let addVal = Object.assign({}, values, {
                    resource: resource.map(Number),
                });
                let editVal = Object.assign({}, addVal, { id: editId });
                if (editOrAdd === 'add') {
                    // 判断权限是否为空
                    if (!resource.length) {
                        message.warning('权限列表不能为空');
                    } else {
                        dispatch({ type: 'auth/addRole', payload: addVal });
                        // 重置表单
                        resetForm();
                        dispatch({
                            type: 'auth/setRoleCheckList',
                            payload: [],
                        });
                        !confirmLoading && setVisible(false);
                    }
                } else {
                    dispatch({ type: 'auth/updateRole', payload: editVal });
                    // 重置表单
                    resetForm();
                    dispatch({
                        type: 'auth/setRoleCheckList',
                        payload: [],
                    });
                    !confirmLoading && setVisible(false);
                }
            }
        });
    };

    return (
        <div>
            <TableListCardPage
                loading={loading}
                columns={columns}
                dataSource={list}
                title="权限管理"
                queryName="人员名称"
                handleQuery={handleQuery}
                add={() => {
                    setVisible(true);
                    setEditOrAdd('add');
                }}
            />

            <CollectionCreateForm
                wrappedComponentRef={modalFormRef}
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    const { resetForm } = modalFormRef.current;
                    resetForm();
                    dispatch({ type: 'auth/setRoleCheckList', payload: [] });
                    setVisible(false);
                }}
                onCreate={handleCreate}
                resourceList={resourceList}
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

const mapStateToProps = ({ auth, loading }: any) => {
    return {
        data: auth.data,
        resourceList: auth.resourceList,
        resource: auth.roleCheckList,
        loading: loading.effects['auth/getRoleList'],
        confirmLoading: loading.effects['auth/getRoleList'],
    };
};

export default connect(mapStateToProps)(index);
