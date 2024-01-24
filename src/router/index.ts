import { createRouter, createWebHistory } from 'vue-router';
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
router.beforeEach(async (to, from, next) => {
    const { getUser } = useAuth(); // Получаем функцию getUser

    await getUser(); // Вызываем getUser и ждем завершения

    await checkAccessToRoute(to, from, next);

    if (to.name !== 'login' && !isUserAuthorized()) {
        next({ name: 'login' });
    } else {
        next();
    }
});


export default router;
