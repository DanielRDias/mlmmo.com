<template>
  <div class="home pa-1">
    <AddDeck ref="addDeck" />
    <Cards ref="cards" />
  </div>
</template>

<script>
// @ is an alias to /src
import AddDeck from "@/components/AddDeck.vue";
import Cards from "@/components/Cards.vue";

export default {
  name: "Home",
  components: {
    AddDeck,
    Cards,
  },
  mounted() {
    this.$refs.addDeck.setAllowEdit(true);
    this.$refs.cards.setAllowEdit(true);
  },
};
</script>
