<template>
  <div class="home">
    <AddCard />
    <Cards />
  </div>
</template>

<script>
// @ is an alias to /src
import Cards from "@/components/Cards.vue";
import AddCard from "@/components/AddCard.vue";

export default {
  name: "Home",
  components: {
    Cards,
    AddCard,
  },
};
</script>
