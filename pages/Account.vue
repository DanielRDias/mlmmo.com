<template>
  <div class="account pa-5">
    <div style="float: right">
      <v-btn @click="logout"> <v-icon>mdi-logout</v-icon> Logout </v-btn>
    </div>
    <h1>{{ user ? user.username : "My" }} account</h1>
    <br />
    <div v-if="mod">
      <h2>Mod Options</h2>
      <br />
      <v-row>
        <v-col cols="2">
          <v-btn to="manageartifacts" elevation="6">
            <v-icon>mdi-dots-triangle</v-icon> Add Artifact
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn to="approvechanges?manageType=artifacts" elevation="6">
            <v-icon>mdi-dots-triangle</v-icon>
            Review Artifact Submissions
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-btn to="managecards" elevation="6">
            <v-icon>mdi-cards</v-icon> Add Card
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn to="approvechanges?manageType=cards" elevation="6">
            <v-icon>mdi-cards</v-icon> Review Card Submissions
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-btn to="manageequipment" elevation="6">
            <v-icon>mdi-tshirt-crew</v-icon> Add Equipment
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn to="approvechanges?manageType=equipments" elevation="6">
            <v-icon>mdi-tshirt-crew</v-icon> Review Equipment Submissions
          </v-btn>
        </v-col>
      </v-row>
      <br />
      <br />
    </div>
    <br />
    <br />
    <h2>My loadouts</h2>
    <div>
      You can share your loadout list using this link:
      <router-link
        :to="{
          name: 'Loadouts',
          query: { username: user.username },
        }"
      >
        http://www.mlarpg.com/loadouts?username={{ user.username }}
      </router-link>
    </div>
    <Loadouts :edit="true" :username="user.username" />
    <br />
    <br />
    <h2>My decks</h2>
    <Decks :user-decks="true" />
  </div>
</template>

<script>
import Decks from "@/components/Decks.vue";
import Loadouts from "@/components/Loadouts.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Decks,
    Loadouts,
  },
  data() {
    return {
      userGroups: [],
      mod: false,
      admin: false,
    };
  },
  async mounted() {
    this.userGroups = await this.$store.dispatch("auth/userGroups");

    if (this.userGroups.includes("Admins")) {
      this.mod = true;
      this.admin = true;
    } else if (this.userGroups.includes("Moderators")) {
      this.mod = true;
      this.admin = false;
    } else {
      this.mod = false;
      this.admin = false;
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions("auth", ["authAction"]),
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>
