<template>
  <div class="account pa-1">
    <h1>{{ user ? user.username : "My" }} account</h1>
    <br />
    <div v-if="mod">
      <h2>Mod Options</h2>
      <br />
      <v-btn text to="addartifacts">Add Artifacts</v-btn>
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

import { Auth } from "aws-amplify";

export default {
  components: {
    Decks,
  },
  data() {
    return {
      userDecks: true,
      userGroups: null,
      mod: false,
      admin: false,
    };
  },
  async mounted() {
    const authUser = await Auth.currentAuthenticatedUser();

    // the array of groups that the user belongs to
    this.userGroups =
      authUser.signInUserSession.accessToken.payload["cognito:groups"];

    if (Array.isArray(this.userGroups)) {
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
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>
