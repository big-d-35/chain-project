import Vue from "vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import NProgress from "nprogress";
const PageTransaction = () => import("../views/PageTransaction.vue");
const PageDesktop = () => import("../views/PageDesktop.vue");

Vue.use(VueRouter);
Vue.use(Meta);

const routes = [
  {
    path: "/",
    name: "PageDesktop",
    component: PageDesktop
  },
  {
    path: "/page-transaction",
    name: "PageTransaction",
    component: PageTransaction
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
