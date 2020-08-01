import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuConfig from './menuConfig';
import { Layouts } from '@/types';

const { SubMenu } = Menu;
const soure = [3, 4];
const a = {
    1: [3, 4],
    2: [5, 6, 7],
};

function MenuNav() {
    return (
        <div>
            <Menu
                theme="dark"
                defaultOpenKeys={['/']}
                defaultSelectedKeys={['/']}
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
