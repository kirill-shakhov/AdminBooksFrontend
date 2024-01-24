export default [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/DashboardLayout/DashboardLayout.vue'),
        meta: { requiresAuth: true }
    }
]