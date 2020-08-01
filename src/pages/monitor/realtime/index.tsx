import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Icon, Menu } from 'antd';
import { connect, Prompt } from 'umi';
import LineChart from '@/components/lineChart';
import momet from 'moment';
import styles from './style.less';
import { webSocketClose, initWebSocket } from '@/models/websocket';
import { quotaName, timeDifference } from '@/assets/asssetsData';

function Realtimes({ deviceData }: any) {
    const isArr = Array.isArray(deviceData);
    const defaultDevice = isArr ? deviceData[deviceData.length - 1] : {};
    const { id, name } = defaultDevice || {};
    const { id: devicesId } = id || {};
    const [dataList, setDataList] = useState<any>([]);
    const [deviceId, setDeviceId] = useState<string>(
        devicesId || '974e0250-c665-11ea-b841-5372d88158bc',
    );
    const [currentDevice, setCurrentDevice] = useState<string>(name || '-');
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
        const { key, item } = e;
        const { children } = item.props;
        setDeviceId(key);
        setCurrentDevice(children);
        webSocketClose();
    }

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
    const columns1 = [
        {
            title: '设备名称',
            dataIndex: 'ts1',
            key: 'ts1',
            render: () => <span>{currentDevice}</span>,
        },
        {
            title: '设备编号',
            dataIndex: '011',
            key: '011',
            render: () => {
                const len = isArr ? deviceData.length : 0;
                for (let i = 0; i < len; i++) {
                    const { additionalInfo } = deviceData[i] || {};
                    const { number } = additionalInfo || {};
                    if (number === deviceId) {
                        return <span>{number}</span>;
                    } else {
                        return <span>-</span>;
                    }
                }
            },
        },
        {
            title: '检测指标',
            dataIndex: '101',
            key: '101',
            render: () => {
                const len = isArr ? deviceData.length : 0;
                for (let i = 0; i < len; i++) {
                    const { additionalInfo } = deviceData[i] || {};
                    const { data } = additionalInfo || {};
                    const dataIsArrr = Array.isArray(data);
                    if (dataIsArrr) {
                        const targetArr = data.map((item: any) => {
                            const { target } = item || {};
                            return quotaName[target];
                        });
                        const text = targetArr.length ? targetArr.join() : '-';
                        return <span>{text}</span>;
                    } else {
                        return <span>-</span>;
                    }
                }
            },
        },
        {
            title: '连接状态',
            dataIndex: 'ts',
            key: 'ts',
            render: (item: number) => {
                let timestamp = new Date().getTime();
                let difference = timestamp - Number(item);
                if (difference < timeDifference) {
                    return (
                        <span>
                            <span className={styles.ok}></span>成功
                        </span>
                    );
                } else {
                    return (
                        <span>
                            <span className={styles.ok}></span>离线
                        </span>
                    );
                }
            },
        },
    ];
    useEffect(() => {
        const newDataList: any[] = [];
        initWebSocket(deviceId, (data: any) => {
            if (data === 'err') {
                setDataList([]);
            } else {
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
                if (newDataList.length > 4) {
                    newDataList.pop();
                }
            }
        });
    }, [deviceId]);
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
            <Prompt
                message={location => {
                    webSocketClose();
                    return true;
                }}
            />
            <div className={styles.toggle}>
                <Dropdown overlay={menu}>
                    <span>
                        切换设备
                        <Icon type="down" />
                    </span>
                </Dropdown>
            </div>
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
            <div className={styles.realtime_tab_box}>
                <h3>设备状态</h3>
                <Table
                    dataSource={dataList}
                    columns={columns1}
                    size="small"
                    rowClassName={(r, k) => (k % 2 === 0 ? '' : styles.odd)}
                />
            </div>
        </div>
    );
}
const mapStateToProps = ({ equipment }: any) => {
    return {
        deviceData: equipment.data,
    };
};

export default connect(mapStateToProps)(Realtimes);
