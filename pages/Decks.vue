<template>
  <div class="home">
    <Decks />
  </div>
</template>

<script>
// @ is an alias to /src
import Decks from "@/components/Decks.vue";

export default {
  name: "Home",
  components: {
    Decks,
  },
};
</script>
