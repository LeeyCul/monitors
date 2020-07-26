import React from 'react';
import { useLocation, history } from 'umi';
import { Breadcrumb, Avatar, Icon } from 'antd';
import style from './style.less';

const Header = () => {
    const breadcrumbNameMap: any = {
        '/': ['数据监控', '实时数据监测'],
        '/history': ['数据监控', '历史数据查询'],
        '/auth': ['系统设置', '权限管理'],
        '/personnel': ['系统设置', '人员管理'],
        '/equipment': ['系统设置', '设备管理'],
        '/equipment/add': ['系统设置', '设备管理'],
    };
    const location = useLocation();
    const path = location.pathname;
    return (
        <div className={style.haader_conainer}>
            <div className={style.left}>
                <span>所在位置：</span>
                <Breadcrumb>
                    {BreadcrumbItem(breadcrumbNameMap[path])}
                </Breadcrumb>
            </div>
            <div className={style.right}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                &nbsp; &nbsp;
                <span>张雪峰</span>
                &nbsp; &nbsp;
                <Icon type="export" onClick={() => history.push('/login')} />
            </div>
        </div>
    );

    function BreadcrumbItem(list: string[]) {
        if (!list) {
            return <Breadcrumb.Item>404页面</Breadcrumb.Item>;
        }
        return list.map((item: any, key: number) => {
            return <Breadcrumb.Item key={key}>{item}</Breadcrumb.Item>;
        });
    }
};

export default Header;
