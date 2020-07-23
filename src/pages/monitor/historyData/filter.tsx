import React from 'react';
import { DatePicker, Form, Button, Radio } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { RangePicker } = DatePicker;

function Filter(props: any) {
    const { onQuery, form } = props
    const { getFieldDecorator, resetFields } = form;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const timeArr = values.time && values.time
                let startTs = values.time && moment(timeArr[0]).unix()
                let endTs = values.time && moment(timeArr[1]).unix()
                let result = Object.assign({}, values, { startTs, endTs })
                delete result.time
                onQuery(result)
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
                    {getFieldDecorator('time')(
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
                    {getFieldDecorator('keys', { initialValue: 'm' })(
                        <Radio.Group>
                            <Radio.Button value="m">分钟数据</Radio.Button>
                            <Radio.Button value="h">小时数据</Radio.Button>
                            {/* <Radio.Button value="">日数据</Radio.Button> */}
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

const FilterForm: any = Form.create()(Filter);

export default FilterForm;
