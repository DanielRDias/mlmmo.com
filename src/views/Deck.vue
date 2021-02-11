<template>
  <div class="deck">
    <Deck :current-deck-id="currentDeckId" />
  </div>
</template>

<script>
// @ is an alias to /src
import Deck from "@/components/Deck.vue";

export default {
  components: {
    Deck,
  },
  data() {
    return {
      currentDeckId: this.$route.query.deckId,
    };
  },
};
</script>
