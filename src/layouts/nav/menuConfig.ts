export default [
    {
        name: '数据监控',
        path: '/',
        icon: 'radar-chart',
        key: 1,
        children: [
            {
                name: '实时数据检测',
                path: '/',
                key: 3,
            },
            {
                name: '历史数据查询',
                path: '/history',
                key: 4,
            },
        ],
    },
    {
        name: '系统管理',
        path: 'inv',
        icon: 'setting',
        key: 2,
        children: [
            {
                name: '设备管理',
                path: '/equipment',
                key: 5,
            },
            {
                name: '权限管理',
                path: '/auth',
                key: 6,
            },
            {
                name: '人员管理',
                path: '/personnel',
                key: 7,
            },
        ],
    },
];
