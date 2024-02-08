export default [
    {
        path: '/books',
        name: 'books',
        component: () => import('../views/BooksLayout/BooksLayout.vue'),
        meta: { requiresAuth: true, permissions: ['USER', 'ADMIN'] },
        children: [
            {
                path: 'library',
                name: 'library',
                component: () => import('../views/BooksLibrary/BooksLibrary.vue'),
                meta: { requiresAuth: true, permissions: ['USER', 'ADMIN'] }
            },
            {
                path: 'upload-book',
                name: 'uploadBook',
                component: () => import('../views/BookUpload/BookUpload.vue'),
                meta: { requiresAuth: true, permissions: ['USER', 'ADMIN'] }
            },
            {
                path: ':bookId',
                name: 'Book',
                component: () => import('../views/BookDetails/BookDetails.vue'),
                meta: { requiresAuth: true, permissions: ['USER', 'ADMIN'] }
            },
            {
                path: '',
                redirect: '/books/library'
            }
        ]
    },

]