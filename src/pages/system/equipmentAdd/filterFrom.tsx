import React from 'react';
import { Form, Input, DatePicker } from 'antd';

const { TextArea } = Input;

function FilterFrom(props: any) {
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 12 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 6 },
            sm: { span: 24 },
        },
    };

    function handleSubmit() {}

    return (
        <div>
            <Form layout="inline" {...formItemLayout} onSubmit={handleSubmit}>
                <Form.Item label="设备名称">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: '请输入设备名称',
                            },
                        ],
                    })(<Input placeholder="请输入设备名称" />)}
                </Form.Item>
                <Form.Item label="设备编号">
                    {getFieldDecorator('nickname', {
                        rules: [
                            {
                                required: true,
                                message: '请输入设备编号',
                            },
                        ],
                    })(<Input placeholder="请输入设备编号" />)}
                </Form.Item>
                <Form.Item label="生产厂商">
                    {getFieldDecorator('username')(
                        <Input placeholder="请输入生产厂商" />,
                    )}
                </Form.Item>
                <Form.Item label="上线时间">
                    {getFieldDecorator('nickname')(
                        <DatePicker
                            style={{ width: '100%' }}
                            placeholder="请选择时间"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="备注信息">
                    {getFieldDecorator('nickname')(
                        <TextArea rows={2} placeholder="请输入备注信息" />,
                    )}
                </Form.Item>
            </Form>
        </div>
    );
}

const Filter = Form.create({})(FilterFrom);

export default Filter;
