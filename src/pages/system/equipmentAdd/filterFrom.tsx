import React from 'react';
import { Form, Input, DatePicker, Row, Col, } from 'antd';

const { TextArea } = Input;

function FilterFrom(props: any) {
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 5 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 20 },
            sm: { span: 20 },
        },
    };

    const formItemLayouts = {
        labelCol: {
            xs: { span: 1 },
            sm: { span: 2 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 },
        },
    };

    function handleSubmit() { }

    return (
        <div>
            <Form  {...formItemLayout} onSubmit={handleSubmit}>
                <Row gutter={18}>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="设备名称">
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入设备名称',
                                    },
                                ],
                            })(<Input placeholder="请输入设备名称" style={{ width: '100%' }} />)}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
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
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="生产厂商">
                            {getFieldDecorator('username')(
                                <Input placeholder="请输入生产厂商" />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="上线时间">
                            {getFieldDecorator('nickname')(
                                <DatePicker
                                    style={{ width: '100%' }}
                                    placeholder="请选择时间"
                                />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={17} md={12} sm={24}>
                        <Form.Item label="备注信息" {...formItemLayouts}>
                            {getFieldDecorator('nickname')(
                                <TextArea rows={2} placeholder="请输入备注信息" />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

const Filter = Form.create({})(FilterFrom);

export default Filter;
