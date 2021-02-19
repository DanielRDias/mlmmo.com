<template>
  <div class="account pa-1">
    <h1>{{ user ? user.username : "My" }} account</h1>
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
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>
