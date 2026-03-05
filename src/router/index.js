// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/main",
    component: () => import("../MainTemplate.vue"),
  },
  {
    path: "/galaktyczny-admin",
    name: "AdminDashboard",
    component: () => import("../components/Admin/AdminDashboard.vue"),
  },
  {
    path: "/",
    name: "MainTemplate",
    component: () => import("../MainTemplate.vue"),
    props: { showGameBtn: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
