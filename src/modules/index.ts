import type { RouteRecordRaw } from 'vue-router';
import AuthModule from "../modules/auth/index.ts";
import DashboardModule from "../modules/dashboard/index.ts";
import SettingsModule from "../modules/settings/index.ts";
import BookModule from "../modules/book/index.ts";

export type ModuleType = {
    router: RouteRecordRaw[];
}

const router = [
    ...AuthModule.router,
    ...DashboardModule.router,
    ...SettingsModule.router,
    ...BookModule.router
]

export default {
    router
}