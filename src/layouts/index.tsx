import React, { memo, useEffect } from 'react';
import { Layout } from 'antd';
import { useHistory } from 'umi'
import Logo from './logo';
import MenuNav from './nav';
import HeaderView from './header';
import styles from './style.less';
import { Layouts } from '@/types';

const { Header, Content, Footer, Sider } = Layout;

const BasicLayout: React.FC<Layouts.IProps> = ({ children }) => {
    const history = useHistory()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.replace('/login');
        }
    }, [])
    return (
        <div className={styles.layout_conainer}>
            <Layout className={styles.layout}>
                <Sider>
                    <div style={{ backgroundColor: '#F2F2F2', height: 50 }}>
                        <Logo />
                    </div>
                    <MenuNav />
                </Sider>
                <Layout>
                    <Header className={styles.header}>
                        <HeaderView />
                    </Header>
                    <Content className={styles.content}>{children}</Content>
                    {/* <Footer className={styles.footer}>脚部</Footer> */}
                </Layout>
            </Layout>
        </div>
    );
};

export default memo(BasicLayout);
