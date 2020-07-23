import React from 'react';
import { Divider, Table } from 'antd';
import { connect } from 'umi'
import Filter from './filter';
import LineChart from '@/components/lineChart';
import styles from './style.less';

function HistoryData({ dispatch }) {
    const columns = [
        {
            title: '采集时间',
            dataIndex: 'update_time',
            key: 'id',
        },
        {
            title: 'COD',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '氨氮',
            dataIndex: 'update_time1',
            key: 'update_time',
        },
        {
            title: '总磷',
            dataIndex: 'update_time1',
            key: 'update_time',
        },
        {
            title: '废水流量',
            dataIndex: 'update_time1',
            key: 'update_time',
        },
    ];
    function handleQuery(value: { startTs?: number, endTs?: number, keys: string }) {
        dispatch({ type: 'history/getHistoryData', payload: value })
    }

    return (
        <div className={styles.history_conainer}>
            <h4>历史数据查询</h4>
            <Filter onQuery={handleQuery} />
            <Divider />
            <div className={styles.contentBox}>
                <Table
                    dataSource={[]}
                    columns={columns}
                    size="small"
                    rowClassName={(r, k) => (k % 2 === 0 ? '' : styles.odd)}
                />
                <div className={styles.show_charts}>
                    <div className={styles.frist}>
                        <LineChart title="监测模块1" />
                    </div>
                    <div>
                        <LineChart title="监测模块2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ history, loading }: any) => {
    return history
}

export default connect(mapStateToProps)(HistoryData);
