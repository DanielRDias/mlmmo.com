<template>
  <div class="home">
    <ManageCards :currentCardId="currentCardtId" />
  </div>
</template>

<script>
// @ is an alias to /src
import ManageCards from "@/components/ManageCards.vue";

export default {
  name: "Home",
  components: {
    ManageCards,
  },
  data() {
    return {
      currentCardtId: this.$route.query.cardId,
    };
  },
};
</script>
