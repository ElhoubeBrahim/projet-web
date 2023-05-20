import * as VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Explore from "../pages/Explore.vue";
import ReadArticle from "../pages/ReadArticle.vue";
import Profile from "../pages/Profile.vue";

const routes = [
  { path: "/", component: Home, meta: { showFooter: true } },
  { path: "/explore", component: Explore, meta: { showFooter: false } },
  {
    path: "/explore/:category",
    component: Explore,
    meta: { showFooter: false },
  },
  { path: "/read/:id", component: ReadArticle, meta: { showFooter: true } },
  { path: "/profile/:id", component: Profile, meta: { showFooter: false } },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

export default router;
