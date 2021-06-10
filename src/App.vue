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
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header class="justify-self-start">
              <div>
                <v-icon class="mr-5">mdi-tools</v-icon>
                <span>Tools</span>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item
                v-for="item in tools"
                :key="item.title"
                :to="item.to"
                link
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          key="ClassWiki"
          href="https://wiki.mlarpg.com/wiki/Class"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-badge-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Classes Wiki</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item key="Wiki" href="https://wiki.mlarpg.com/" link>
          <v-list-item-icon>
            <v-icon>mdi-wikipedia</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Wiki</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item key="account" to="/account" link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Account</v-list-item-title>
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
      {{ bpMessage }}
      <v-spacer></v-spacer>

      <v-btn icon href="https://discord.gg/Ubaepf4pUJ" target="_blank">
        <v-icon>mdi-discord</v-icon>
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
    tools: [
      { title: "Deck Builder", icon: "mdi-playlist-edit", to: "/deckbuilder" },
      {
        title: "Loadout Builder",
        icon: "mdi-newspaper-plus",
        to: "/loadoutbuilder",
      },
      { title: "DPS Tracker", icon: "mdi-sword-cross", to: "/dpstracker" },
      {
        title: "Collection Checklist",
        icon: "mdi-format-list-checks",
        to: "/collectionchecklist",
      },
    ],
    items: [
      { title: "Decks", icon: "mdi-playlist-check", to: "/decks" },
      { title: "Loadout List", icon: "mdi-newspaper", to: "/loadouts" },
      { title: "Spells", icon: "mdi-cards", to: "/cards" },
      { title: "Artifacts", icon: "mdi-dots-triangle", to: "/artifacts" },
      { title: "Equipment", icon: "mdi-tshirt-crew", to: "/equipments" },
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
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
    bpMessage() {
      var bpEndTime = new Date("2021-07-20T00:00:00.000+00:00");
      var date = new Date();
      var exp = 0;
      while (date < bpEndTime) {
        exp += 375;
        if (date.getDay() === 4) {
          // Sun=0, Mon=1, Tue=2, etc.
          exp += 1600;
        }
        date.setDate(date.getDate() + 1);
      }
      let levels = Math.floor(exp / 1000);
      return levels + " Levels of Battlepass remaining. (" + exp + " EXP)";
    },
  },
};
</script>
