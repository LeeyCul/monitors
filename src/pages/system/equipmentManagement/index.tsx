import React, { useState } from 'react';
import { useHistory, connect, } from 'umi'
import { Divider, Icon } from 'antd';
import moment from 'moment'
import TableListCardPage from '@/components/tableListCardPage';

function index({ data, loading, dispatch }: any) {
    const [visible, setVisible] = useState<Boolean>(false);
    const history = useHistory()
    const columns = [
        {
            title: <span><Icon type="database" style={styles.marginR5} />设备名称</span>,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <span><Icon type="ordered-list" style={styles.marginR5} />设备编号</span>,
            dataIndex: 'tenantId',
            key: 'tenantId',
            render: (item: any) => <span>{item['id']}</span>
        },
        {
            title: <span><Icon type="message" style={styles.marginR5} />监测指标</span>,
            dataIndex: 'id',
            key: 'id',
            render: (item: any) => <span>{item['entityType']}</span>
        },
        {
            title: '上线时间',
            dataIndex: 'createdTime',
            key: 'createdTime',
            render: (time: any) => <span>{moment(time).format('YYYY-MM-DD')}</span>
        },
        {
            title: <span><Icon type="small-dash" style={styles.marginR5} />操作</span>,
            width: 200,
            render: (record: any) => {
                return (
                    <span>
                        <span style={styles.action} onClick={() => {
                            history.push('/equipment/add')
                        }}>编辑</span>
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



    function handleQuery(keyWords: string) {
        dispatch({ type: 'equipment/getEquipmentList', payload: keyWords })
    }

    function lotSizeDel(value: any[]) {
        value.length && value.map((id: string) => {
            let result = id.replace("\"", "").replace("\"", "");
            dispatch({ type: 'equipment/delEquipment', payload: result })
        })
    }

    function handleSigleDel(record: any) {
        const { id } = record.id
        dispatch({ type: 'equipment/delEquipment', payload: id })
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
    }
}

const styles = {
    action: {
        color: '#53A8E2',
        cursor: 'pointer'
    },
    marginR5: {
        marginRight: '5px'
    },
}

export default connect(mapStateToProps)(index);
