import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "quiz",
      component: () => import("@/views/QuizView.vue"),
    },
    {
      path: "/settings/",
      name: "settings",
      component: () => import("@/views/SettingsView.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;
