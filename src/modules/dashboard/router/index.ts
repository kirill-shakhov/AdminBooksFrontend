export default [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/DashboardLayout/DashboardLayout.vue'),
        meta: { requiresAuth: true, permissions: ['USER', 'ADMIN'] }
    }
]