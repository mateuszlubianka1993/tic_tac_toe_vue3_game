import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { ROUTES } from "../config";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.HOME_PAGE.path,
      name: ROUTES.HOME_PAGE.name,
      component: HomeView,
    },
    {
      path: ROUTES.GAME_PAGE.path,
      name: ROUTES.GAME_PAGE.name,
      component: () => import("../views/GameView.vue"),
    },
    {
      path: ROUTES.HISTORY_PAGE.path,
      name: ROUTES.HISTORY_PAGE.name,
      component: () => import("../views/HistoryView.vue"),
    },
  ],
});

export default router;
