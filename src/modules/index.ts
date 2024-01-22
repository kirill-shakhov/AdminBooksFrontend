import type { RouteRecordRaw } from 'vue-router';
import AuthModule from "../modules/auth/index.ts";

export type ModuleType = {
    router: RouteRecordRaw[];
}

const router = [
    ...AuthModule.router,
]

export default {
    router
}