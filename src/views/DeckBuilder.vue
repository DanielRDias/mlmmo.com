<template>
  <div class="home pa-1">
    <DeckBuilder :currentDeckId="currentDeckId" />
  </div>
</template>

<script>
// @ is an alias to /src
import DeckBuilder from "@/components/DeckBuilder.vue";

export default {
  name: "Home",
  components: {
    DeckBuilder,
  },
  data() {
    return {
      currentDeckId: this.$route.query.deckId,
    };
  },
};
</script>
