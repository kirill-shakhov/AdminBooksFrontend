import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import modules from "../modules/index.ts";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...modules.router
    ]
});

export default router;
