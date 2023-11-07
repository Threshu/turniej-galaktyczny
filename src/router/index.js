// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
  name: "Website",
    component: () => import('../MainTemplate.vue'),
  },
  {
    path: '/galaktyczny-admin',
    name: 'AdminDashboard',
    component: () => import('../components/Admin/AdminDashboard.vue'),
  },
  {
    path: '/zagraj',
    name: 'NewGame',
    component: () => import('../components/NewGame/NewGame.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
