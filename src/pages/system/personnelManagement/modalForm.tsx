import React, { useState } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { AuthManagement } from '@/types'

const { Option } = Select;

function AuthModal({ form, visible, confirmLoading, onCancel, onCreate }: AuthManagement.ModalFrom) {
    const { getFieldDecorator } = form


    return (
        <Modal
            title="新增人员"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            width={342}
            okText='确定'
            cancelText="取消"
            onOk={() => {
                form
                    .validateFields()
                    .then((values: any) => {
                        onCreate(values);
                    })
                    .catch((info: any) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form layout="vertical">
                <Form.Item label="角色名称" style={styles.marginB2}>
                    {getFieldDecorator('t', {
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="密码" style={styles.marginB2}>
                    {getFieldDecorator('t1', {
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="绑定角色" style={styles.marginB2}>
                    {getFieldDecorator('t2', {
                        rules: [{ required: true, message: '请输入' }],
                    })(<Select placeholder="请选择角色">
                        <Option value="china">China</Option>
                        <Option value="usa">U.S.A</Option>
                    </Select>)}
                </Form.Item>
                <Form.Item label="联系电话" style={styles.marginB2}>
                    {getFieldDecorator('t3', {
                        rules: [{ required: false, message: '请输入' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="真实兴民" style={styles.marginB2}>
                    {getFieldDecorator('t4', {
                        rules: [{ required: false, message: '请输入' }],
                    })(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}

const styles = {
    marginB2: {
        marginBottom: 2
    }
}

const CollectionCreateForm: any = Form.create({})(AuthModal)

export default CollectionCreateForm
