import { useAuth } from "../../shared/composables/useAuth/useAuth.ts";

export async function checkAccessToRoute(to, from, next) {
    const { user, hasAccess } = useAuth(); // Получаем функцию getUser
    const { requiresAuth, permissions } = to.meta;

    const roles = user.value?.roles;

    if (requiresAuth && !hasAccess(roles, permissions)) {
        alert("У вас нет доступа к этому маршруту");
        next(false); // Останавливаем переход к новому маршруту
        return;
    }
    next();
}