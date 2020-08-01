import React, { useState, useEffect } from 'react';
import { Divider, Dropdown, Icon, Menu } from 'antd';
import { connect } from 'umi';
import Filter from './filter';
import LineChart from '@/components/lineChart';
import CustomTable from '@/components/customTable';
import styles from './style.less';
import { IHistoryData } from '@/types';

function HistoryData({
    dispatch,
    list,
    loading,
    deviceData,
}: IHistoryData.IindexState) {
    const isArr = Array.isArray(deviceData);
    const defaultDevice = isArr ? deviceData[deviceData.length - 1] : {};
    const { id } = defaultDevice || {};
    const { id: devicesId } = id || {};
    const [deviceId, setDeviceId] = useState<string>(
        devicesId || '974e0250-c665-11ea-b841-5372d88158bc',
    );

    useEffect(() => {
        dispatch({
            type: 'historyData/getHistoryData',
            payload: { id: deviceId },
        });
    }, [deviceId]);
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
        dispatch({
            type: 'historyData/getHistoryData',
            payload: { id: deviceId, condition: value },
        });
    }
    const chartsData: any = {};
    list &&
        Object.keys(list).forEach((item: any) => {
            const isArr = Array.isArray(list[item]);
            let arr =
                isArr &&
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

    const menu = isArr ? (
        <Menu onClick={handleMenuClick}>
            {deviceData.map((item: any) => {
                const { name, id } = item || {};
                const { id: ID } = id || {};
                return <Menu.Item key={ID}>{name}</Menu.Item>;
            })}
        </Menu>
    ) : (
        <Menu></Menu>
    );

    function handleMenuClick(e: any) {
        const { key } = e;
        setDeviceId(key);
    }

    return (
        <div className={styles.history_conainer}>
            <div className={styles.toggle}>
                <h4>历史数据查询</h4>
                <Dropdown overlay={menu}>
                    <span>
                        切换设备
                        <Icon type="down" />
                    </span>
                </Dropdown>
            </div>

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

const mapStateToProps = ({ historyData, equipment, loading }: any) => {
    return {
        list: historyData.list,
        deviceData: equipment.data,
        loading: loading.effects['historyData/getHistoryData'],
    };
};

export default connect(mapStateToProps)(HistoryData);
