export default [
    {
        name: '数据监控',
        path: '/',
        icon: 'radar-chart',
        children: [
            {
                name: '实时数据检测',
                path: '/',
            },
            {
                name: '历史数据查询',
                path: '/history',
            },
        ],
    },
    {
        name: '系统管理',
        path: 'inv',
        icon: 'setting',
        children: [
            {
                name: '权限管理',
                path: '/auth',
            },
            {
                name: '人员管理',
                path: '/personnel',
            },
            {
                name: '设备管理',
                path: '/equipment',
            },
        ],
    },
];
