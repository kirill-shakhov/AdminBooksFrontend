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
    const { getUser } = useAuth(); // Получаем функцию getUser

    await getUser(); // Вызываем getUser и ждем завершения

    if (to.name !== 'login' && !isUserAuthorized()) {
        next({ name: 'login' });
    }

    await checkAccessToRoute(to, from, next);

});


export default router;
