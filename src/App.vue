<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <router-link to="/">
        <v-img
          v-if="$vuetify.breakpoint.height < 700"
          src="mlarpg-mobile-logo.png"
          width="270"
          height="135"
        />
        <v-img v-else src="mlarpg-logo.png" width="270" height="270" />
      </router-link>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item key="Wiki" href="https://wiki.mlarpg.com" link>
          <v-list-item-icon>
            <v-icon>mdi-wikipedia</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Wiki</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-if="!user" key="Login" to="/login" link>
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!user" key="Register" to="/register" link>
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user" key="account" to="/account" link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user">
          <v-list-item-icon> </v-list-item-icon>
          <v-list-item-content> </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user" key="Logout" @click="logout" link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-switch
        class="pl-5"
        color="blue darken-3"
        v-model="$vuetify.theme.dark"
        label="Theme"
        v-on:change="themeToggleEvent"
        prepend-icon="mdi-theme-light-dark"
      >
      </v-switch>
    </v-navigation-drawer>
    <v-app-bar app src="./assets/img/header.jpg">
      <template v-slot:img="{ props }" v-if="!$vuetify.theme.dark">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn icon href="https://discord.gg/Ubaepf4pUJ" target="_blank">
        <v-icon>mdi-discord</v-icon>
      </v-btn>
      <v-btn icon href="https://www.facebook.com/MLaRPG" target="_blank">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon href="https://twitter.com/mlarpg" target="_blank">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-home", to: "/" },
      { title: "Decks", icon: "mdi-playlist-check", to: "/decks" },
      { title: "Deck Builder", icon: "mdi-playlist-edit", to: "/adddeck" },
      { title: "Loadout List", icon: "mdi-newspaper", to: "/loadouts" },
      {
        title: "Loadout Builder",
        icon: "mdi-newspaper-plus",
        to: "/loadoutbuilder",
      },
      { title: "Classes", icon: "mdi-badge-account", to: "/classes" },
      { title: "Cards", icon: "mdi-cards", to: "/cards" },
      { title: "Artifacts", icon: "mdi-dots-triangle", to: "/artifacts" },
      { title: "Equipments", icon: "mdi-tshirt-crew", to: "/equipments" },
      {
        title: "Collection Checklist",
        icon: "mdi-format-list-checks",
        to: "/collectionchecklist",
      },
      {
        title: "Content Creators",
        icon: "mdi-video-vintage",
        to: "/contentcreators",
      },
      { title: "Contact", icon: "mdi-help-box", to: "/contact" },
    ],
  }),
  mounted() {
    this.authAction();
  },
  methods: {
    themeToggleEvent(event) {
      localStorage.setItem("darktheme", event);
    },
    ...mapActions("auth", ["authAction"]),
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>
