import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import { Auth } from "aws-amplify";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/classes",
    name: "Classes",
    component: () => import("../views/Classes.vue"),
  },
  {
    path: "/cards",
    name: "Cards",
    component: () => import("../views/Cards.vue"),
  },
  {
    path: "/card",
    name: "Card",
    component: () => import("../views/Card.vue"),
  },
  {
    path: "/addcards",
    name: "AddCards",
    component: () => import("../views/AddCards.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/decks",
    name: "Decks",
    component: () => import("../views/Decks.vue"),
  },
  {
    path: "/adddeck",
    name: "AddDeck",
    component: () => import("../views/AddDeck.vue"),
  },
  {
    path: "/artifacts",
    name: "Artifacts",
    component: () => import("../views/Artifacts.vue"),
  },
  {
    path: "/contentcreators",
    name: "ContentCreators",
    component: () => import("../views/ContentCreators.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = await Auth.currentUserInfo();

  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
