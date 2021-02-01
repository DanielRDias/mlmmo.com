<template>
  <div class="home">
    <AddDeck ref="addDeck" />
    <Cards />
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
  },
};
</script>
