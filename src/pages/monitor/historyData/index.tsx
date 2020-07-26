import React from 'react';
import { Divider, Table } from 'antd';
import { connect } from 'umi';
import moment from 'moment';
import Filter from './filter';
import LineChart from '@/components/lineChart';
import CustomTable from '@/components/customTable';
import styles from './style.less';
import { IHistoryData } from '@/types';

function HistoryData({
    dispatch,
    list = {},
    loading,
}: IHistoryData.IindexState) {
    const columns = [
        {
            title: '采集时间',
            dataIndex: 'ts',
            key: 'ts',
            other: 'ts',
        },
        {
            title: 'COD',
            dataIndex: '011',
            key: '011',
        },
        {
            title: '氨氮',
            dataIndex: '060',
            key: '060',
        },
        {
            title: '总磷',
            dataIndex: '101',
            key: '101',
        },
        {
            title: '废水流量',
            dataIndex: 'B01',
            key: 'B01',
        },
    ];
    function handleQuery(value: {
        startTs?: number;
        endTs?: number;
        keys: string;
    }) {
        dispatch({ type: 'historyData/getHistoryData', payload: value });
    }
    const chartsData: any = {};
    list &&
        Object.keys(list).forEach((item: any) => {
            let arr =
                list &&
                list[item] &&
                list[item].map((sub: any) => {
                    return sub['value'];
                });
            Object.assign(chartsData, { [item]: arr });
        });
    const arr1 = ['101', '011', 'ts'];
    const chartsData1: any = {};
    const arr2 = ['060', 'B01', 'ts'];
    const chartsData2: any = {};
    arr1.forEach((item: any) => {
        Object.assign(chartsData1, { [item]: list[item] });
    });
    arr2.forEach((item: any) => {
        Object.assign(chartsData2, { [item]: list[item] });
    });

    return (
        <div className={styles.history_conainer}>
            <h4>历史数据查询</h4>
            <Filter onQuery={handleQuery} />
            <Divider />
            <div className={styles.contentBox}>
                <div>
                    <CustomTable
                        columns={columns}
                        data={list}
                        loading={loading}
                    />
                </div>

                <div className={styles.show_charts}>
                    <div className={styles.frist}>
                        <LineChart title="监测模块1" data={chartsData1} />
                    </div>
                    <div>
                        <LineChart title="监测模块2" data={chartsData2} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ historyData, loading }: any) => {
    return {
        list: historyData.list,
        loading: loading.effects['historyData/getHistoryData'],
    };
};

export default connect(mapStateToProps)(HistoryData);
