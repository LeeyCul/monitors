import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuConfig from './menuConfig';

const { SubMenu } = Menu;

function MenuNav() {
    return (
        <div>
            <Menu
                theme="dark"
                defaultSelectedKeys={['/amc/list']}
                mode="inline"
            >
                {createMenu(menuConfig)}
            </Menu>
        </div>
    );
}

const createMenu = (list: Layouts.Menu[]) => {
    return list.map((item: Layouts.Menu) => {
        const { name, path, children, icon = '' } = item;
        if (children) {
            return (
                <SubMenu
                    key={path}
                    title={
                        <span>
                            <Icon type={icon} />
                            <span>{name}</span>
                        </span>
                    }
                >
                    {createMenu(children as any)}
                </SubMenu>
            );
        }
        return (
            <Menu.Item key={path}>
                <Link to={path}>
                    <Icon type={icon} />
                    <span>{name}</span>
                </Link>
            </Menu.Item>
        );
    });
};

export default MenuNav;
