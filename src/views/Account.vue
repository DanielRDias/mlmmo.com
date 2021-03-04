<template>
  <div class="account pa-1">
    <h1>{{ user ? user.username : "My" }} account</h1>
    <br />
    <div v-if="mod">
      <h2>Mod Options</h2>
      <br />
      <v-btn text to="manageartifacts">Manage Artifacts</v-btn>
      <v-btn text to="approvechanges">Review Artifact Submissions</v-btn>
      <br />
      <br />
    </div>
    <h2>My decks</h2>
    <Decks :user-decks="userDecks" />
  </div>
</template>

<script>
import Decks from "@/components/Decks.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Decks,
  },
  data() {
    return {
      userDecks: true,
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
};
</script>
