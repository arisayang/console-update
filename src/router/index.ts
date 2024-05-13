import Vue from "vue";
import VueRouter, { RouteConfig, RouterOptions } from "vue-router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/contact-us',
    name: 'contact-us',
    component: () => import('@/views/ContactUs.vue'),
    meta: { appBarTitle: '自來客' },
  },
];

const routerOptions: RouterOptions = {
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
};

const router = new VueRouter(routerOptions);


/** 模擬 router hooks */
export function useRouter() {
  return router;
}

export function useRoute() {
  return router.currentRoute;
}

export default router;