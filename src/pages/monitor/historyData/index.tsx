import React from 'react';
import { Divider, Table } from 'antd';
import Filter from './filter';
import LineChart from '@/components/lineChart';
import styles from './style.less';

function HistoryData() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '时间',
            dataIndex: 'update_time',
            key: 'update_time',
        },
    ];
    return (
        <div className={styles.history_conainer}>
            <h4>历史数据查询</h4>
            <Filter />
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

export default HistoryData;
