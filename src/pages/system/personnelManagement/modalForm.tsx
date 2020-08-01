import React, { useImperativeHandle, forwardRef } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { AuthManagement } from '@/types';

const { Option } = Select;

function AuthModal(
    {
        form,
        visible,
        confirmLoading,
        onCancel,
        onCreate,
        title,
        isRequired,
        roleList,
    }: AuthManagement.ModalFrom,
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
            title={title || '新增人员'}
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            width={342}
            okText="确定"
            cancelText="取消"
            onOk={onCreate}
        >
            <Form layout="vertical">
                <Form.Item label="用户名" style={styles.marginB2} hasFeedback>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="密码" style={styles.marginB2} hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: isRequired,
                                message: '请输入',
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="绑定角色" style={styles.marginB2} hasFeedback>
                    {getFieldDecorator('roleId', {
                        rules: [{ required: false, message: '请输入' }],
                    })(
                        <Select placeholder="请选择角色">
                            {roleList &&
                                roleList.length &&
                                roleList.map((item: any, index: number) => {
                                    return (
                                        <Option value={item.id}>
                                            {item.name}
                                        </Option>
                                    );
                                })}
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="联系电话" style={styles.marginB2} hasFeedback>
                    {getFieldDecorator('iphone', {
                        rules: [
                            { required: false, message: '请输入' },
                            {
                                pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                                message: '请输入正确的手机号',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="真实姓名" style={styles.marginB2} hasFeedback>
                    {getFieldDecorator('realName', {
                        rules: [{ required: false, message: '请输入' }],
                    })(<Input />)}
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
