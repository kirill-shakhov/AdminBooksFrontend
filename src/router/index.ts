import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import modules from "../modules/index.ts";
import { isUserAuthorized } from "../utils/isUserAuthorized/isUserAuthorized.ts";
import { useAuth } from '../shared/composables/useAuth/useAuth.ts';
import { checkAccessToRoute } from "./guards/checkAccessToRoute.ts";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...modules.router
    ]
});

// GOOD
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const { getUser, user } = useAuth(); // Получаем функцию getUser

    // Проверяем, не пытается ли пользователь перейти на страницу логина или регистрации
    if (to.name === 'login' || to.name === 'register') {
        next();
        return; // Завершаем выполнение функции, чтобы предотвратить дальнейшие проверки
    }

    if (!isUserAuthorized()) {
        next({ name: 'login' });
        return; // Добавляем return, чтобы избежать выполнения последующего кода, если пользователь не авторизован
    }

    if (user.value === null ) {
        await getUser(); // Вызываем getUser и ждем завершения
    }

    await checkAccessToRoute(to, from, next);
});



export default router;
