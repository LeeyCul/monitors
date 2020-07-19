import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import LineChart from '@/components/lineChart';
import styles from './style.less';
import { Realtime } from '@/types';

function Realtimes({ dataSource }: Realtime.IndexProps) {
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
        <div className={styles.realtime_conainer}>
            <div className={styles.realtime_top}>
                <div className={styles.chartBox}>
                    <LineChart style={{ height: '300px' }} title="检测指标1" />
                </div>
                <div className={styles.chartBox}>
                    <LineChart style={{ height: '300px' }} title="检测指标2" />
                </div>
            </div>
            <div className={styles.realtime_tab_box}>
                <h3>实时数据报表</h3>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    rowClassName={(r, k) => (k % 2 === 0 ? '' : styles.odd)}
                />
            </div>
            <div className={styles.realtime_tab_box}>
                <h3>实时数据报表</h3>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    rowClassName={(r, k) => (k % 2 === 0 ? '' : styles.odd)}
                />
            </div>
        </div>
    );
}

const mapStateToProps = ({ realtime }: any) => {
    return {
        dataSource: realtime.dataSource,
    };
};

export default connect(mapStateToProps)(Realtimes);
