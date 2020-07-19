export default [
    {
        path: '/',
        component: '@/layouts/index',
        routes: [
            { path: '/', component: '@/pages/monitor/realtime' },
            { path: '/history', component: '@/pages/monitor/historyData' },
            { path: '/auth', component: '@/pages/system/authmanagement' },
            {
                path: '/equipment',
                component: '@/pages/system/equipmentManagement',
            },
            {
                path: '/equipment/add',
                component: '@/pages/system/equipmentAdd',
            },
            {
                path: '/personnel',
                component: '@/pages/system/personnelManagement',
            },
        ],
    },
];
