export default [
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Registration/Registration.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/Login.vue'),
        meta: { requiresAuth: false }
    }
]