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
                path: '/personnel',
                component: '@/pages/system/personnelManagement',
            },
        ],
    },
];
