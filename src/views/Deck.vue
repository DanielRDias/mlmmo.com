<template>
  <div class="deck">
    <Deck :deck-id="deckId" />
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
      deckId: this.$route.query.deckId,
    };
  },
};
</script>
