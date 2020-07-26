import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import LineChart from '@/components/lineChart';
import momet from 'moment';
import styles from './style.less';
import { Realtime } from '@/types';
import { WebSocketAPIExample } from '@/models/websocket';

function Realtimes({ dataSource }: Realtime.IndexProps) {
    const [dataList, setDataList] = useState<any>([]);
    const columns = [
        {
            title: '采集时间',
            dataIndex: 'ts',
            key: 'ts',
            render: (item: number) => (
                <span>{momet(item).format('YYYY-MM-DD h:mm:ss')}</span>
            ),
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

    useEffect(() => {
        const newDataList: any[] = [];
        WebSocketAPIExample(data => {
            const result = JSON.parse(data).data;
            let objData = {};
            for (let key in result) {
                let newkey = key && key.split('_')[1];
                const [ts, value] = result[key][0];
                Object.assign(objData, {
                    [newkey]: value,
                    ts,
                });
            }
            newDataList.unshift(objData);
            setDataList([...newDataList]);
            if (newDataList.length > 15) {
                newDataList.pop();
            }
        });
    }, []);
    let chartsData: any = {};
    const len = dataList.length;
    const objArr = len > 0 ? Object.keys(dataList[0]) : [];
    objArr.forEach((item: any) => {
        let arr = dataList.map((sub: any) => {
            return sub[item];
        });
        Object.assign(chartsData, { [item]: arr });
    });
    const arr1 = ['101', '011', 'ts'];
    const chartsData1: any = {};
    const arr2 = ['060', 'B01', 'ts'];
    const chartsData2: any = {};
    arr1.forEach((item: any) => {
        Object.assign(chartsData1, { [item]: chartsData[item] });
    });
    arr2.forEach((item: any) => {
        Object.assign(chartsData2, { [item]: chartsData[item] });
    });
    return (
        <div className={styles.realtime_conainer}>
            <div className={styles.realtime_top}>
                <div className={styles.chartBox}>
                    <LineChart
                        style={{ height: '300px' }}
                        title="检测指标1"
                        data={chartsData1}
                    />
                </div>
                <div className={styles.chartBox}>
                    <LineChart
                        style={{ height: '300px' }}
                        title="检测指标2"
                        data={chartsData2}
                    />
                </div>
            </div>
            <div className={styles.realtime_tab_box}>
                <h3>实时数据报表</h3>
                <Table
                    dataSource={dataList}
                    columns={columns}
                    size="small"
                    pagination={false}
                    rowClassName={(r, k) => (k % 2 === 0 ? '' : styles.odd)}
                />
            </div>
            {/* <div className={styles.realtime_tab_box}>
                <h3>实时数据报表</h3>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    rowClassName={(r, k) => (k % 2 === 0 ? '' : styles.odd)}
                />
            </div> */}
        </div>
    );
}

export default connect()(Realtimes);
