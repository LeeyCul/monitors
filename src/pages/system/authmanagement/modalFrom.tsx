import React, { useState } from 'react'
import { Modal, Form, Input, Tree } from 'antd'
import { AuthManagement } from '@/types'
import styles from './modalFrom.less'
import PropsTypes from 'prop-types'

const { TextArea } = Input;
const { TreeNode } = Tree;

function AuthModal({ form, visible, confirmLoading, onCancel, onCreate }: AuthManagement.ModalFrom) {
    const { getFieldDecorator } = form
    const [checkList, setCheckList] = useState([])
    const [isRequired, setIsRequired] = useState<boolean>(true)

    const treeData = [
        {
            title: '0-0',
            key: '0-0',
            children: [
                {
                    title: '0-0-0',
                    key: '0-0-0',
                },
                {
                    title: '0-0-1',
                    key: '0-0-1',
                },
                {
                    title: '0-0-2',
                    key: '0-0-2',
                },
            ],
        },
        {
            title: '0-1',
            key: '0-1',
            children: [
                { title: '0-1-0-0', key: '0-1-0-0' },
                { title: '0-1-0-1', key: '0-1-0-1' },
                { title: '0-1-0-2', key: '0-1-0-2' },
            ],
        },
        {
            title: '0-2',
            key: '0-2',
        },
    ];

    const TreeComponent = ({ changEvent }: any) => {
        return <Tree
            checkable
            // expandedKeys={['STATUS']}
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
        setIsRequired(false)
        //过滤掉父级的key
        // checkedKeys = checkedKeys.filter(item => item !== 'STATUS')
        // this.setState({ checkList: checkedKeys })
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
                        console.log('checkList :>> ', checkList);
                        onCreate(values);
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
                    <div className={styles.leftBox}>
                        <Form.Item label="权限列表">
                            {getFieldDecorator('tt', {
                                rules: [{ required: isRequired, message: '请选择' }],
                            })(<TreeComponent changEvent={onCheck} />)}
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

const CollectionCreateForm: any = Form.create({ name: 'form_in_modal' })(AuthModal)

// CollectionCreateForm.prototype = {
//     visible: PropsTypes.bool,
//     confirmLoading: PropsTypes.bool
// }

export default CollectionCreateForm
