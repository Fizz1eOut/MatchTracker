import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouterScrollBehavior } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TeamView from '@/views/TeamView.vue';
import NewsView from '@/views/NewsView.vue';

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
    { path: '/news', name: 'news', component: NewsView, meta: { title: 'News' } },
    { path: '/team/:id', name: 'team', component: TeamView, meta: { title: 'Team' }, props: true },
  ],
  scrollBehavior,
});

export default router;
