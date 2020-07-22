import React from 'react';
import { connect } from 'umi';
import { Button, Form, Input, Icon } from 'antd';
import { ILogin } from '@/types'

function SignInForm({ form, dispatch }: ILogin.Logins) {
    const { getFieldDecorator, validateFields } = form
    const submit = (e: any) => {
        e.preventDefault();
        validateFields((err: any, values: any) => {
            if (!err) {
                dispatch({ type: 'login/loginIn', payload: values })
            }
        })
    }
    return <Form onSubmit={submit} >
        <Form.Item>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }],
            })(
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="账号"
                />,
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('password', {
                rules: [
                    { required: true, message: '请输入密码' },
                ],
            })(
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                />,
            )}
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
    </Form>
}

const Login = Form.create({ name: 'sign_in_form' })(SignInForm);

export default connect()(Login)
