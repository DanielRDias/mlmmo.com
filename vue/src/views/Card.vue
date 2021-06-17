<template>
  <div class="home">
    <Card :current-card-id="currentCardId" />
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {
      currentCardId: this.$route.query.cardId,
    };
  },
};
</script>
