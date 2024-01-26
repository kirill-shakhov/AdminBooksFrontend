import type { RouteRecordRaw } from 'vue-router';
import AuthModule from "../modules/auth/index.ts";
import DashboardModule from "../modules/dashboard/index.ts";
import SettingsModule from "../modules/settings/index.ts";

export type ModuleType = {
    router: RouteRecordRaw[];
}

const router = [
    ...AuthModule.router,
    ...DashboardModule.router,
    ...SettingsModule.router
]

export default {
    router
}