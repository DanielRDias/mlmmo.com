<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> MLMMO.com</v-list-item-title>
          <v-list-item-subtitle>Magic Legends MMO</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app src="./assets/other/book-1769625_640-min.png">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Magic Legends</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-switch
        color="blue darken-3"
        v-model="$vuetify.theme.dark"
        label="Theme"
        v-on:change="themeToggleEvent"
        prepend-icon="mdi-theme-light-dark"
      >
      </v-switch>

      <v-menu bottom left> </v-menu>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-home", to: "/" },
      { title: "Decks", icon: "mdi-view-dashboard", to: "/decks" },
      { title: "Classes", icon: "mdi-badge-account", to: "/classes" },
      { title: "Cards", icon: "mdi-cards", to: "/cards" },
      { title: "Artifacts", icon: "mdi-dots-triangle", to: "/artifacts" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
  }),
  // mounted() {
  //   this.authAction();
  // },
  methods: {
    themeToggleEvent(event) {
      localStorage.setItem("darktheme", event);
    },
    // ...mapActions("auth", ["authAction"]),
    // async logout() {
    //   await this.$store.dispatch("auth/logout");
    //   this.$router.push("/");
    // },
  },
  // computed: {
  //   ...mapGetters({
  //     user: "auth/user",
  //   }),
  // },
};
</script>
