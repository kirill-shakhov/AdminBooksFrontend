import { useAuth } from "../../shared/composables/useAuth/useAuth.ts";
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export async function checkAccessToRoute(
  to: RouteLocationNormalized & { meta: { roles: string[], permissions: string[]} },
  _: RouteLocationNormalized & { meta: { roles: string[], permissions: string[]} },
  next: NavigationGuardNext
) {
    const { user, hasAccess } = useAuth(); // Получаем функцию getUser
    const { requiresAuth, permissions } = to.meta;

    const roles = user.value?.roles;

    if (roles && requiresAuth && !hasAccess(roles, permissions)) {
        alert("У вас нет доступа к этому маршруту");
        next(false); // Останавливаем переход к новому маршруту
        return;
    }

    next();
}
