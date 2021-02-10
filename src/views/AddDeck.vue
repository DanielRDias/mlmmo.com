<template>
  <div class="home pa-1">
    <v-row>
      <v-col cols="12" xs="6" sm="3" md="3" lg="3">
        <AddDeck :deck-edit="allowDeckEdit" />
      </v-col>
      <v-col cols="12" xs="12" sm="9" md="9" lg="9">
        <Cards :deck-edit="allowDeckEdit" />
      </v-col>
    </v-row>
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
