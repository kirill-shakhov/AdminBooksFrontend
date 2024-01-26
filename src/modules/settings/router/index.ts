export default [
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/SettingsLayout/SettingsLayout.vue'),
        meta: { requiresAuth: true, permissions: ['USER', 'ADMIN'] },
        children: [
            {
                path: 'profile',
                name: 'profile',
                component: () => import('../views/ProfileSettings/ProfileSettings.vue'),
                meta: { requiresAuth: true, permissions: ['USER', 'ADMIN'] }
            }
        ]
    },
]