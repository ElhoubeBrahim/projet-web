import * as VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Explore from "../pages/Explore.vue";

const routes = [
  { path: "/", component: Home, meta: { showFooter: true } },
  { path: "/explore", component: Explore, meta: { showFooter: false } },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
