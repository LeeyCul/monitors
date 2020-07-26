import React, { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { AuthManagement } from '@/types';

const { TextArea } = Input;

function AuthModal({
    indexData,
    form,
    visible,
    confirmLoading,
    onCancel,
    onCreate,
}: AuthManagement.ModalFrom) {
    const { getFieldDecorator } = form;
    useEffect(() => {
        if (indexData) {
            form.setFieldsValue(indexData);
        }
    }, [indexData]);
    return (
        <Modal
            title="添加指标"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            width={342}
            okText="确定"
            cancelText="取消"
            onOk={() => {
                form.validateFields()
                    .then((values: any) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info: any) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form layout="vertical">
                <Form.Item label="最小值" style={styles.marginB2}>
                    {getFieldDecorator('min', {
                        rules: [{ required: false, message: '请输入' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="最大值" style={styles.marginB2}>
                    {getFieldDecorator('max', {
                        rules: [{ required: false, message: '请输入' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="备注" style={styles.marginB2}>
                    {getFieldDecorator('description1', {
                        rules: [{ required: false, message: '请输入' }],
                    })(<TextArea rows={2} />)}
                </Form.Item>
            </Form>
        </Modal>
    );
}

const styles = {
    marginB2: {
        marginBottom: 2,
    },
};

const CollectionCreateForm: any = Form.create({})(AuthModal);

export default CollectionCreateForm;
