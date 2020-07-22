import React from 'react';
import { Layout, Card } from 'antd';
import Login from './index'
const { Content } = Layout;

const LoginPage: React.FC = () => {
    return (
        <Layout style={{ height: '100%' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card style={{ width: 469, paddingTop: 30 }}>
                    <div style={{ marginBottom: 30, textAlign: 'center' }}>
                        <h3>园区环境监测系统</h3>
                        <Login />
                    </div>
                </Card>
            </Content>
        </Layout >
    );
}
export default LoginPage;