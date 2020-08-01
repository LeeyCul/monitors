import React, { useImperativeHandle, forwardRef } from 'react';
import { Form, Input, DatePicker, Row, Col } from 'antd';

const { TextArea } = Input;

function FilterFrom(props: any, ref: any) {
    const { form } = props;
    const { getFieldDecorator } = form;
    useImperativeHandle(ref, () => ({
        formFields: props.form.validateFields,
        formFieldsValue: (value: any) => {
            props.form.setFieldsValue(value);
        },
        resetForm: form.resetFields,
    }));
    const formItemLayout = {
        labelCol: {
            xs: { span: 8 },
            sm: { span: 8 },
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

    return (
        <div>
            <Form {...formItemLayout}>
                <Row gutter={18}>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="设备名称" hasFeedback>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入设备名称',
                                    },
                                ],
                            })(
                                <Input
                                    placeholder="请输入设备名称"
                                    style={{ width: '100%' }}
                                />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="设备编号" hasFeedback>
                            {getFieldDecorator('number', {
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
                        <Form.Item label="MNID" hasFeedback>
                            {getFieldDecorator('mn', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入mnid号',
                                    },
                                ],
                            })(<Input placeholder="请输入mnid号" />)}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="生产厂商" hasFeedback>
                            {getFieldDecorator('manufacturer')(
                                <Input placeholder="请输入生产厂商" />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="上线时间" hasFeedback>
                            {getFieldDecorator('createdTime')(
                                <DatePicker
                                    style={{ width: '100%' }}
                                    placeholder="请选择时间"
                                />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={17} md={12} sm={24}>
                        <Form.Item
                            label="备注信息"
                            {...formItemLayouts}
                            hasFeedback
                        >
                            {getFieldDecorator('description')(
                                <TextArea
                                    rows={2}
                                    placeholder="请输入备注信息"
                                />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

const Filter: any = Form.create({})(forwardRef(FilterFrom));

export default Filter;
