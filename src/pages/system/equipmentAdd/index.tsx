import React from 'react';
import { Icon, Table, Button, Divider } from 'antd';
import FilterFrom from './filterFrom';
import AddCard from './addCard';
import styles from './style.less';

function index() {
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns: any = [
        {
            title: '指标名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '阀值',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '备注',
            dataIndex: 'age1',
            key: 'age1',
        },
        {
            title: '操作',
            width: 200,
            align: 'center',
            render: () => {
                return (
                    <span>
                        <span className={styles.handle}>编辑</span>
                        <Divider type="vertical" />
                        <span className={styles.handle}>删除</span>
                    </span>
                );
            },
        },
    ];
    return (
        <div className={styles.equipment_add_conainer}>
            <div className={styles.title_box}>
                <Icon type="left" style={{ height: 22, cursor: 'pointer' }} />
                <h4>新增设备</h4>
            </div>
            <FilterFrom />
            <div className={styles.table_conainer}>
                <div className={styles.table_style}>
                    <h4>指标信息</h4>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        size="small"
                        rowClassName={(r, k) => (k % 2 === 0 ? '' : styles.odd)}
                    />
                </div>
                <AddCard />
            </div>
            <div>
                <Button style={{ marginRight: 10 }}>取消</Button>
                <Button type="primary">确定</Button>
            </div>
        </div>
    );
}

export default index;
