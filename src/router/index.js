import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
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
      metaTags: [
        {
          name: "og:title",
          content:
            "Magic: Legends ARPG - Best deck, class, cards and artifacts",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      requiresAuth: false,
      title: "Login | Magic: Legends ARPG",
    },
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/Account.vue"),
    meta: {
      requiresAuth: true,
      title: "Account | Magic: Legends ARPG",
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
    path: "/registercode",
    name: "RegisterCode",
    component: () => import("../views/RegisterCode.vue"),
    meta: {
      requiresAuth: false,
      title: "Register Code - Activate your account | Magic: Legends ARPG",
    },
  },
  {
    path: "/classes",
    name: "Classes",
    component: () => import("../views/Classes.vue"),
    meta: {
      requiresAuth: false,
      title:
        "Classes - Sanctifier, Mindmage, Necromancer, Geomancer & Beastcaller | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content:
            "Classes - Sanctifier, Mindmage, Necromancer, Geomancer & Beastcaller | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/cards",
    name: "Cards",
    component: () => import("../views/Cards.vue"),
    meta: {
      requiresAuth: false,
      title: "Card Spells - White, Blue, Black, Red & Green",
      metaTags: [
        {
          name: "og:title",
          content: "Card Spells - White, Blue, Black, Red & Green",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/card",
    name: "Card",
    component: () => import("../views/Card.vue"),
    meta: {
      requiresAuth: false,
      title:
        "Card - Plains, Island, Swamp, Mountain & Forest | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content:
            "Card - Plains, Island, Swamp, Mountain & Forest | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/approvechanges",
    name: "ApproveChanges",
    component: () => import("../views/ApproveChanges.vue"),
    meta: { requiresAuth: true, requiresGroup: ["Admins", "Moderators"] },
  },
  {
    path: "/managecards",
    name: "ManageCards",
    component: () => import("../views/ManageCards.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/manageartifacts",
    name: "ManageArtifacts",
    component: () => import("../views/ManageArtifacts.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/manageequipments",
    name: "ManageEquipments",
    component: () => import("../views/ManageEquipments.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/artifact",
    name: "Artifact",
    component: () => import("../views/Artifact.vue"),
    meta: {
      requiresAuth: false,
      title:
        "Artifact | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content:
            "Artifact | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/artifacts",
    name: "Artifacts",
    component: () => import("../views/Artifacts.vue"),
    meta: {
      requiresAuth: false,
      title: "Artifacts - Lesser, Greater & Legendary | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content:
            "Artifacts - Lesser, Greater & Legendary | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/equipment",
    name: "Equipment",
    component: () => import("../views/Equipment.vue"),
    meta: {
      requiresAuth: false,
      title:
        "Equipment | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content:
            "Equipment | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells, artifacts and equipments. Build and share your own decks with our deck building tool, card, equipments and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells, artifacts and equipments. Build and share your own decks with our deck building tool, card, equipments and gear database.",
        },
      ],
    },
  },
  {
    path: "/equipments",
    name: "Equipments",
    component: () => import("../views/Equipments.vue"),
    meta: {
      requiresAuth: false,
      title: "Equipments | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content:
            "Equipments | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells, artifacts and equipments. Build and share your own decks with our deck building tool, card, equipments and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells, artifacts and equipments. Build and share your own decks with our deck building tool, card, equipments and gear database.",
        },
      ],
    },
  },
  {
    path: "/deck",
    name: "Deck",
    component: () => import("../views/Deck.vue"),
    meta: {
      requiresAuth: false,
      title: "Magic: Legends Deck | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content: "Magic: Legends Deck | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/decks",
    name: "Decks",
    component: () => import("../views/Decks.vue"),
    meta: {
      requiresAuth: false,
      title: "Decks - Best Magic Legends Decks | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content: "Decks - Best Magic Legends Decks | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/adddeck",
    name: "AddDeck",
    component: () => import("../views/AddDeck.vue"),
    meta: {
      requiresAuth: false,
      title: "Create Deck - Deck building tool | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content: "Create Deck - Deck building tool | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/collectionchecklist",
    name: "CollectionChecklist",
    component: () => import("../views/CollectionChecklist.vue"),
    meta: {
      requiresAuth: false,
      title:
        "Collection Checklist - Classes, Spells, Artifacts & Customization | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content:
            "Collection Checklist - Classes, Spells, Artifacts & Customization | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/contentcreators",
    name: "ContentCreators",
    component: () => import("../views/ContentCreators.vue"),
    meta: {
      requiresAuth: false,
      title:
        "Content Creators - Join us and share your content | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content:
            "Content Creators - Join us and share your content | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
        {
          property: "og:description",
          content:
            "Magic: Legends ARPG has the best deck, class, card spells and artifacts. Build and share your own decks with our deck building tool, card, artifacts and gear database.",
        },
      ],
    },
  },
  {
    path: "/geomancerlore",
    name: "GeomancerLore",
    component: () => import("../views/GeomancerLore.vue"),
    meta: {
      requiresAuth: false,
      title: "Geomancer Lore - The Planeswalker Koth | Magic: Legends ARPG",
      metaTags: [
        {
          name: "og:title",
          content:
            "Geomancer Lore - The Planeswalker Koth | Magic: Legends ARPG",
        },
        {
          name: "og:image",
          content: "/logo.png",
        },
        {
          name: "description",
          content:
            "Today we're going to learn a little more about the Planeswalker that the Geomancer class is based on. This is meant to be a quick overview to give you an idea of what the character is like. Many of the stories, especially for the more established Planeswalkers, take place over years, MANY years, and often multiple books or short stories. To be clear, this is about the character that the class is based on. This character may or may not appear in the game, and either way, it is a separate entity from the class you'll be playing.",
        },
        {
          property: "og:description",
          content:
            "Today we're going to learn a little more about the Planeswalker that the Geomancer class is based on. This is meant to be a quick overview to give you an idea of what the character is like. Many of the stories, especially for the more established Planeswalkers, take place over years, MANY years, and often multiple books or short stories. To be clear, this is about the character that the class is based on. This character may or may not appear in the game, and either way, it is a separate entity from the class you'll be playing.",
        },
      ],
    },
  },
  {
    path: "/contact",
    name: "Contact",
    // route level code-splitting
    // this generates a separate chunk (contact.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
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
    path: "/cookiedeclaration",
    name: "CookieDeclaration",
    component: () => import("../views/CookieDeclaration.vue"),
  },
  {
    path: "/beta",
    name: "Beta",
    component: () => import("../views/Beta.vue"),
    meta: {
      requiresAuth: false,
      title: "Magic: Legends Open Beta release date | Magic: Legends ARPG",
    },
    metaTags: [
      {
        name: "og:title",
        content: "Magic: Legends Open Beta release date | Magic: Legends ARPG",
      },
      {
        name: "og:image",
        content: "/logo.png",
      },
      {
        name: "description",
        content: "Magic: Legends Open Beta release date count down.",
      },
      {
        property: "og:description",
        content: "Magic: Legends Open Beta release date count down.",
      },
    ],
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
      next("/login");
    }
    const requiresGroup = to.matched.some(
      (record) => record.meta.requiresGroup
    );
    if (requiresGroup) {
      const allowedGroups = to.matched.find(
        (record) => record.meta.requiresGroup
      );
      const authUser = await Auth.currentAuthenticatedUser();
      const userGroups = await authUser.signInUserSession.accessToken.payload[
        "cognito:groups"
      ];

      if (Array.isArray(userGroups)) {
        if (
          !allowedGroups.meta.requiresGroup.some(
            (r) => userGroups.indexOf(r) >= 0
          )
        ) {
          next("/");
        }
      } else {
        next("/");
      }
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
  next();
});

export default router;
