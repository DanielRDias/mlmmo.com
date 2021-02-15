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
    meta: {
      requiresAuth: false,
      title: "Magic: Legends ARPG - Best deck, class, cards and artifacts",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
      title: "Login | Magic: Legends ARPG",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      requiresAuth: false,
      title: "Register - Create new account | Magic: Legends ARPG",
    },
  },
  {
    path: "/classes",
    name: "Classes",
    component: () => import("../views/Classes.vue"),
    meta: {
      requiresAuth: false,
      title:
        "Classes - Sanctifier, Mindmage, Necromancer, Geomancer && Beastcaller | Magic: Legends ARPG",
    },
  },
  {
    path: "/cards",
    name: "Cards",
    component: () => import("../views/Cards.vue"),
    meta: {
      requiresAuth: false,
      title: "Cards - White, Blue, Black, Red && Green | Magic: Legends ARPG",
    },
  },
  {
    path: "/card",
    name: "Card",
    component: () => import("../views/Card.vue"),
    meta: {
      requiresAuth: false,
      title: "Magic: Legends Card | Magic: Legends ARPG",
    },
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
    meta: {
      requiresAuth: false,
      title: "Decks - Best Magic Legends Decks | Magic: Legends ARPG",
    },
  },
  {
    path: "/deck",
    name: "Deck",
    component: () => import("../views/Deck.vue"),
    meta: {
      requiresAuth: false,
      title: "Magic: Legends Deck | Magic: Legends ARPG",
    },
  },
  {
    path: "/adddeck",
    name: "AddDeck",
    component: () => import("../views/AddDeck.vue"),
    meta: {
      requiresAuth: false,
      title: "Create Deck - Create your own Deck | Magic: Legends ARPG",
    },
  },
  {
    path: "/artifacts",
    name: "Artifacts",
    component: () => import("../views/Artifacts.vue"),
    meta: {
      requiresAuth: false,
      title: "Artifacts - Lesser, Greater && Legendary | Magic: Legends ARPG",
    },
  },
  {
    path: "/collectionchecklist",
    name: "CollectionChecklist",
    component: () => import("../views/CollectionChecklist.vue"),
    meta: {
      requiresAuth: false,
      title:
        "Collection Checklist - Classes, Spells, Artifacts && Customization | Magic: Legends ARPG",
    },
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
  {
    path: "/privacypolicy",
    name: "PrivacyPolicy",
    component: () => import("../views/PrivacyPolicy.vue"),
  },
  {
    path: "/termsconditions",
    name: "TermsConditions",
    component: () => import("../views/TermsConditions.vue"),
  },
  {
    path: "/beta",
    name: "Beta",
    component: () => import("../views/Beta.vue"),
    meta: {
      requiresAuth: false,
      title: "Magic: Legends Open Beta release date",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    const isAuthenticated = await Auth.currentUserInfo();
    if (!isAuthenticated) {
      next("/");
    }
  }
  const defaultTitle =
    "Magic: Legends ARPG - Best deck, class, cards and artifacts";
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else {
    document.title = defaultTitle;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));
});

export default router;
