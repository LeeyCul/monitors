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
    const [data, setData] = useState<any>([]);
    const [trem, setTrem] = useState<any>();
    const [modalEditOrAdd, setModalEditOrAdd] = useState<string>('');
    const [editKey, setEditKey] = useState<any>('');
    const [editInfo, setEditInfo] = useState<any>({});

    const filterFormRef: any = useRef();
    const modalFormRef: any = useRef();

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
            const {
                number,
                manufacturer,
                createdTime,
                data,
                mn,
            } = additionalInfo;
            let time = moment(createdTime);
            const formValu = {
                name,
                number,
                mn,
                manufacturer,
                description: label,
                createdTime: time,
            };
            //回填数据
            setEditInfo(state);
            setTitle('编辑设备');
            setData(data || []);
            filterFormRef.current.formFieldsValue(formValu);
        }
    }, []);

    const handleQuotaSubmit = () => {
        const { getVal, resetForm } = modalFormRef.current;
        getVal((err: any, value: EquipmentAdd.ModalFromVal) => {
            if (!err) {
                const addVal = Object.assign({}, value, { target: trem });
                if (modalEditOrAdd === 'edit') {
                    const editVal = Object.assign({}, value, {
                        target: editKey,
                    });
                    const newData =
                        data.length &&
                        data.filter((item: any) => editKey !== item.target);
                    setData([...newData, editVal]);
                } else {
                    const len =
                        data.length &&
                        data.filter((item: any) => trem === item.target).length;
                    if (len) {
                        message.info('相同的指标只能存在一个！');
                    } else {
                        setData([...data, addVal]);
                    }
                }
                resetForm();
                setVisible(false);
            }
        });
    };

    function handleDel(recordId: string) {
        const dataSource = data.filter((item: any) => item.target !== recordId);
        setData(dataSource);
    }

    function handleEdit(value: any) {
        const { setVal } = modalFormRef.current;
        setEditKey(value.target);
        setModalEditOrAdd('edit');
        setVal(value);
        setVisible(true);
    }

    function handleSubmit() {
        const { formFields, resetForm } = filterFormRef.current;
        formFields((err: any, value: any) => {
            if (!err) {
                const {
                    name,
                    number,
                    manufacturer,
                    createdTime,
                    mn,
                    description,
                } = value;
                const addVal = {
                    name,
                    type: 'Test',
                    label: description,
                    additionalInfo: {
                        gateway: false,
                        description: '',
                        number,
                        mn,
                        manufacturer,
                        createdTime,
                        data,
                    },
                };
                const editVal = Object.assign({}, editInfo, addVal);
                // 判断指标信息是否为空
                if (data.length) {
                    const { state } = location;
                    const type = state ? false : true;
                    const objVal = state ? editVal : addVal;
                    dispatch({
                        type: 'equipment/addEquipment',
                        payload: { value: objVal, type: type },
                    });
                    resetForm();
                    setData([]);
                } else {
                    message.warning('指标为必填项，请添加指标');
                }
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
                wrappedComponentRef={filterFormRef}
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
                        setModalEditOrAdd('add');
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
                title={modalEditOrAdd === 'edit' ? '编辑指标' : null}
                visible={visible}
                onCancel={() => {
                    const { resetForm } = modalFormRef.current;
                    resetForm();
                    setVisible(false);
                }}
                onCreate={handleQuotaSubmit}
                wrappedComponentRef={modalFormRef}
            />
        </div>
    );
}

export default connect()(index);
