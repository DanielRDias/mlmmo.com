<template>
  <div class="home pa-1">
    <AddDeck :deck-edit="allowDeckEdit" />
    <Cards :deck-edit="allowDeckEdit" />
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
  data() {
    return {
      allowDeckEdit: true,
    };
  },
};
</script>
