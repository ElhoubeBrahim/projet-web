import * as VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Explore from "../pages/Explore.vue";
import ReadArticle from "../pages/ReadArticle.vue";
import Profile from "../pages/Profile.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";

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
  { path: "/login", component: Login, meta: { showFooter: true } },
  { path: "/register", component: Register, meta: { showFooter: true } },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

export default router;
