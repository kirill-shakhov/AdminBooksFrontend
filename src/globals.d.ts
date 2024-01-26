import 'vue-router';

declare module 'vue-router' {
  export interface RouteLocationNormalized {
    meta: {
      requiresAuth?: boolean;
      roles: string[];
      permissions: string[];
    }
  }
}
