import React, { useState } from 'react'
import { Modal, Form, Input, Tree } from 'antd'
import { AuthManagement } from '@/types'
import styles from './modalFrom.less'

const { TextArea } = Input;
const { TreeNode } = Tree;

function AuthModal({ form, visible, confirmLoading, onCancel, onCreate }: AuthManagement.ModalFrom) {
    const { getFieldDecorator } = form
    const [checkList, setCheckList] = useState([])
    const [isRequired, setIsRequired] = useState<boolean>(true)

    const treeData = [
        {
            title: '数据监控',
            key: '0-0',
            children: [
                {
                    title: '实时监控',
                    key: '0-0-0',
                },
                {
                    title: '历史记录',
                    key: '0-0-1',
                },
            ],
        },
        {
            title: '系统设置',
            key: '0-1',
            children: [
                { title: '权限管理', key: '0-1-0-0' },
                { title: '人员管理', key: '0-1-0-1' },
                { title: '设备管理', key: '0-1-0-2' },
            ],
        },
    ];

    const TreeComponent = ({ changEvent }: any) => {
        return <Tree
            checkable
            checkedKeys={checkList}
            onCheck={changEvent}
        >
            {renderTreeNodes(treeData)}
        </Tree>
    }

    const renderTreeNodes = (data: any) =>
        data.map((item: any) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });

    const onCheck = (checkedKeys: any) => {
        setIsRequired(true)
        //过滤掉父级的key
        // checkedKeys = checkedKeys.filter(item => item !== 'STATUS')
        setCheckList(checkedKeys)
    }

    return (
        <Modal
            title="新增角色"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            width={600}
            okText='确定'
            cancelText="取消"
            onOk={() => {
                form
                    .validateFields()
                    .then((values: any) => {
                        let val = Object.assign({}, values, { tt: checkList })
                        const isSelect = checkList.length ? true : false
                        if (isSelect) {
                            onCreate(val);
                            setCheckList([])
                        }
                        setIsRequired(isSelect)
                    })
                    .catch((info: any) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form layout="vertical">
                <div className={styles.modalText_box}>
                    <div>
                        <Form.Item label="角色名称">
                            {getFieldDecorator('t', {
                                rules: [{ required: true, message: '请输入机构名称' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="备注">
                            {getFieldDecorator('description')(<TextArea rows={2} placeholder='请输入备注' />)}
                        </Form.Item>
                    </div>
                    <div className={styles.rightBox}>
                        <Form.Item label={<div>
                            <span className={styles.start}>*</span>
                            权限列表
                            <div className={styles.errText} style={{ display: isRequired ? 'none' : 'block' }}>请选择</div>
                        </div>}>
                            {getFieldDecorator('tt')(< TreeComponent changEvent={onCheck} />)}

                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

const CollectionCreateForm: any = Form.create({ name: 'form_in_modal' })(AuthModal)

export default CollectionCreateForm
