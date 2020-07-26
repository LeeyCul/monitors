import React, { useState, useRef, useEffect } from 'react';
import { Icon, Table, Button, Divider, Popconfirm, message } from 'antd';
import { connect, history } from 'umi';
import moment from 'moment';
import FilterFrom from './filterFrom';
import AddCard from './addCard';
import ModalForm from './modalForm';
import { quotaName } from '@/assets/asssetsData';
import styles from './style.less';
import { EquipmentAdd } from '@/types';

function index({ dispatch, location }: EquipmentAdd.AddInex) {
    const [visible, setVisible] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('新增设备');
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const [trem, setTrem] = useState<any>();
    const [indexData, setIndexData] = useState<any>();
    const [editOrAdd, setEditOrAdd] = useState<string>('');
    const [editKey, setEditKey] = useState<any>('');

    const getFormValue: any = useRef();

    const columns: any = [
        {
            title: '指标名称',
            dataIndex: 'target',
            key: 'target',
            render: (item: string) => <span>{quotaName[item]}</span>,
        },
        {
            title: '阀值',
            dataIndex: 'min',
            key: 'min',
            render: (item: string, record: any) => (
                <span>{`${record.min}-${record.max}`}</span>
            ),
        },
        {
            title: '备注',
            dataIndex: 'description1',
            key: 'description1',
        },
        {
            title: '操作',
            width: 200,
            align: 'center',
            render: (item: any, record: any) => {
                return (
                    <span>
                        <span
                            className={styles.handle}
                            onClick={() => {
                                handleEdit(record);
                            }}
                        >
                            编辑
                        </span>
                        <Divider type="vertical" />
                        <span
                            className={styles.handle}
                            onClick={() => {
                                handleDel(record.target);
                            }}
                        >
                            删除
                        </span>
                    </span>
                );
            },
        },
    ];

    useEffect(() => {
        const { state } = location;
        if (state) {
            const { name, additionalInfo, label } = state;
            console.log('state :>> ', state);
            const {
                number,
                manufacturer,
                createdTime,
                description,
            } = additionalInfo;
            let time = moment(createdTime);
            const formValu = {
                name,
                number,
                manufacturer,
                label,
                createdTime: time,
            };
            //回填数据
            setTitle('编辑设备');
            setData(description);
            getFormValue.current.formFieldsValue(formValu);
        }
    }, []);

    const handleCreate = (value: any) => {
        const objVal = Object.assign({}, value, { target: trem });
        if (editOrAdd === 'edit') {
            const newData = data.filter((item: any) => editKey !== item.target);
            setData([...newData, objVal]);
        } else {
            setData([...data, objVal]);
        }
        setVisible(false);
    };

    function handleDel(recordId: string) {
        const dataSource = data.filter((item: any) => item.target !== recordId);
        setData(dataSource);
    }

    function handleEdit(value: any) {
        setEditKey(value.target);
        setEditOrAdd('edit');
        setIndexData(value);
        setVisible(true);
    }

    function handleSubmit() {
        const { formFields } = getFormValue.current;
        formFields().then((value: any) => {
            const { name, number, manufacturer, createdTime, label } = value;
            const resultVal = {
                name,
                type: 'test',
                label: '测试',
                additionalInfo: {
                    gateway: false,
                    description: data,
                    number,
                    manufacturer,
                    // createdTime: moment().unix(),
                    createdTime,
                },
            };
            if (data.length) {
                const { state } = location;
                if (state) {
                    message.success('修改成功');
                } else {
                    dispatch({
                        type: 'equipment/addEquipment',
                        payload: resultVal,
                    });
                }
            } else {
                message.warning('指标为必填项，请添加指标');
            }
        });
    }
    return (
        <div className={styles.equipment_add_conainer}>
            <div className={styles.title_box}>
                <Icon
                    type="left"
                    style={{ height: 22, cursor: 'pointer' }}
                    onClick={() => {
                        history.push('/equipment');
                    }}
                />
                <h4>{title}</h4>
            </div>
            <FilterFrom
                onCreate={handleSubmit}
                wrappedComponentRef={getFormValue}
            />
            <div className={styles.table_conainer}>
                <div className={styles.table_style}>
                    <h4>指标信息</h4>
                    <Table
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                        size="small"
                        rowClassName={(r, k) => (k % 2 === 0 ? '' : styles.odd)}
                    />
                </div>
                <AddCard
                    showModa={(trem: any) => {
                        setTrem(trem);
                        setVisible(true);
                        setEditOrAdd('add');
                    }}
                />
            </div>
            <div>
                <Popconfirm
                    title="您确定要取消吗?取消后会清空所有填写数据"
                    onConfirm={() => {
                        history.push('/equipment');
                    }}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button style={{ marginRight: 10 }}>取消</Button>
                </Popconfirm>

                <Button type="primary" onClick={handleSubmit}>
                    确定
                </Button>
            </div>
            <ModalForm
                indexData={indexData}
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    setVisible(false);
                    setIndexData('');
                }}
                onCreate={handleCreate}
            />
        </div>
    );
}

export default connect()(index);
