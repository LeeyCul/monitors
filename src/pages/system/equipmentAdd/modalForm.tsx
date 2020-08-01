import React, { useImperativeHandle, forwardRef } from 'react';
import { Modal, Form, Input } from 'antd';
import { EquipmentAdd } from '@/types';

const { TextArea } = Input;

function AuthModal(
    { form, visible, onCancel, onCreate, title }: EquipmentAdd.ModalFrom,
    ref: any,
) {
    const { getFieldDecorator } = form;

    useImperativeHandle(ref, () => ({
        getVal: form.validateFields,
        setVal: (value: any) => {
            form.setFieldsValue(value);
        },
        resetForm: form.resetFields,
    }));
    return (
        <Modal
            title={title || '添加指标'}
            visible={visible}
            onCancel={onCancel}
            width={342}
            okText="确定"
            cancelText="取消"
            onOk={onCreate}
        >
            <Form layout="vertical">
                <Form.Item label="最小值" style={styles.marginB2} hasFeedback>
                    {getFieldDecorator('min', {
                        rules: [
                            {
                                required: true,
                                message: '请输入正确的数值',
                                pattern: new RegExp(
                                    /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
                                ),
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="最大值" style={styles.marginB2} hasFeedback>
                    {getFieldDecorator('max', {
                        rules: [
                            {
                                required: true,
                                message: '请输入正确的数值',
                                pattern: new RegExp(
                                    /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
                                ),
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="备注" style={styles.marginB2} hasFeedback>
                    {getFieldDecorator('description', {
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

const CollectionCreateForm: any = Form.create({})(forwardRef(AuthModal));

export default CollectionCreateForm;
