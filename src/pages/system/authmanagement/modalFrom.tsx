import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Form, Input, Tree } from 'antd';
import { AuthManagement } from '@/types';
import { handleData } from '@/utils/util';
import TreeComponent from './Tree';
import styles from './modalFrom.less';

const { TextArea } = Input;

function AuthModal(
    {
        form,
        visible,
        confirmLoading,
        onCancel,
        onCreate,
        resourceList,
    }: AuthManagement.ModalFrom,
    ref: any,
) {
    const { getFieldDecorator } = form;
    const treeData = handleData(resourceList as any);

    useImperativeHandle(ref, () => ({
        getVal: form.validateFields,
        setVal: (value: any) => {
            form.setFieldsValue(value);
        },
        resetForm: form.resetFields,
    }));
    return (
        <Modal
            title="新增角色"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            width={600}
            okText="确定"
            cancelText="取消"
            onOk={onCreate}
        >
            <Form layout="vertical">
                <div className={styles.modalText_box}>
                    <div>
                        <Form.Item label="角色名称" hasFeedback>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入机构名称',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="备注" hasFeedback>
                            {getFieldDecorator('description')(
                                <TextArea rows={2} placeholder="请输入备注" />,
                            )}
                        </Form.Item>
                    </div>
                    <div className={styles.rightBox}>
                        <Form.Item
                            label={
                                <div>
                                    <span className={styles.start}>*</span>
                                    权限列表
                                </div>
                            }
                        >
                            {getFieldDecorator('resource')(
                                <TreeComponent treeData={treeData} />,
                            )}
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Modal>
    );
}

const CollectionCreateForm: any = Form.create({ name: 'form_in_modal' })(
    forwardRef(AuthModal),
);

export default CollectionCreateForm;
