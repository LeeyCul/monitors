import React from 'react';
import { DatePicker, Form, Button, Radio } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { RangePicker } = DatePicker;

function Filter(props: any) {
    const { getFieldDecorator, resetFields } = props.form;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Form layout="inline" onSubmit={handleSubmit}>
                <Form.Item label="时间选择">
                    {getFieldDecorator('username')(
                        <RangePicker
                            locale={locale}
                            style={{
                                lineHeight: '46px',
                                width: 272,
                            }}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('radio-group', { initialValue: 'a' })(
                        <Radio.Group>
                            <Radio.Button value="a">分钟数据</Radio.Button>
                            <Radio.Button value="b">小时数据</Radio.Button>
                            <Radio.Button value="c">日数据</Radio.Button>
                        </Radio.Group>,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        onClick={() => {
                            resetFields();
                        }}
                    >
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const FilterForm = Form.create()(Filter);

export default FilterForm;
