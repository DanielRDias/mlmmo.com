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
    <v-app-bar
      app
      src="./assets/book-1769625_640.png"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Magic Legends</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- <v-list-item v-if="!user" key="Login" to="/login" link>
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
          <v-list-item v-if="user" key="Logout" @click="logout" link>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
          <v-switch
            v-model="$vuetify.theme.dark"
            label="Theme"
            v-on:change="themeToggleEvent"
            prepend-icon="mdi-theme-light-dark"
          >
          </v-switch>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-home", to: "/" },
      { title: "Builds", icon: "mdi-view-dashboard", to: "/builds" },
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
