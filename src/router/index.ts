import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouterScrollBehavior } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MatchDetailsView from '@/views/MatchDetailsView.vue';

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else if (to.path !== from.path) {
    return { top: 0 };
  }
  return {};
};

const router = createRouter({
  history: createWebHashHistory('/MatchTracker'),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/match/:matchId', name: 'MatchDetails', component: MatchDetailsView, props: true }
  ],
  scrollBehavior,
});

export default router;
