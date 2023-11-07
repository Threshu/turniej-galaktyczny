// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../MainTemplate.vue'),
  },
  {
    path: '/galaktyczny-admin',
    name: 'AdminDashboard',
    component: () => import('../components/Admin/AdminDashboard.vue'),
  },
  {
    path: '/zagraj',
    name: 'MainTemplate',
    component: () => import('../MainTemplate.vue'),
    props: { showGameBtn: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
