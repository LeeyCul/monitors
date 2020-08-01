import React, { useState } from 'react';
import { useHistory, connect } from 'umi';
import { Divider, Icon, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import TableListCardPage from '@/components/tableListCardPage';
import { quotaName } from '@/assets/asssetsData';

function index({ data, loading, dispatch }: any) {
    const history = useHistory();
    const columns = [
        {
            title: (
                <span>
                    <Icon type="database" style={styles.marginR5} />
                    设备名称
                </span>
            ),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: (
                <span>
                    <Icon type="ordered-list" style={styles.marginR5} />
                    设备编号
                </span>
            ),
            dataIndex: 'additionalInfo',
            key: 'additionalInfo',
            render: (item: any) => {
                const { number } = item;
                return <span>{number}</span>;
            },
        },
        {
            title: (
                <span>
                    <Icon type="message" style={styles.marginR5} />
                    监测指标
                </span>
            ),
            dataIndex: 'label',
            key: 'label',
            render: (item: any, record: any) => {
                const { data } = record.additionalInfo;
                const isArr = Array.isArray(data);
                const result = isArr
                    ? data.map((item: any) => {
                          return quotaName[item.target];
                      })
                    : [];
                return <span>{result.join()}</span>;
            },
        },
        {
            title: '上线时间',
            dataIndex: 'createdTime',
            key: 'createdTime',
            render: (time: any) => (
                <span>{moment(time).format('YYYY-MM-DD')}</span>
            ),
        },
        {
            title: (
                <span>
                    <Icon type="small-dash" style={styles.marginR5} />
                    操作
                </span>
            ),
            dataIndex: 'id',
            width: 200,
            render: (item: any, record: any) => {
                return (
                    <span>
                        <span
                            style={styles.action}
                            onClick={() => {
                                dispatch(
                                    routerRedux.push({
                                        pathname: '/equipment/add',
                                        state: record,
                                    }),
                                );
                            }}
                        >
                            编辑
                        </span>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="您确定要取消吗?"
                            onConfirm={() => {
                                handleSigleDel(record);
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

    function handleQuery(keyWords: string) {
        dispatch({ type: 'equipment/getEquipmentList', payload: keyWords });
    }

    function lotSizeDel(value: any[]) {
        value.length &&
            value.map((id: string) => {
                let result = id.replace('"', '').replace('"', '');
                dispatch({ type: 'equipment/delEquipment', payload: result });
            });
    }

    function handleSigleDel(record: any) {
        const { id } = record.id;
        dispatch({ type: 'equipment/delEquipment', payload: id });
    }

    return (
        <TableListCardPage
            loading={loading}
            columns={columns}
            selectable={true}
            dataSource={data}
            title="设备管理"
            queryName="人员名称"
            handleQuery={handleQuery}
            add={() => history.push('/equipment/add')}
            lotSizeDel={lotSizeDel}
        />
    );
}
const mapStateToProps = ({ equipment, loading }: any) => {
    return {
        data: equipment.data,
        loading: loading.effects['equipment/getEquipmentList'],
    };
};

const styles = {
    action: {
        color: '#53A8E2',
        cursor: 'pointer',
    },
    marginR5: {
        marginRight: '5px',
    },
};

export default connect(mapStateToProps)(index);
