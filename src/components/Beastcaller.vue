<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="..\assets\classes\beastcaller-class-magic-legends-wiki-guide-300px.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Beastcaller
    </v-card-title>

    <v-card-subtitle>
      Green
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="green lighten-1"
        text
      >
        More Information
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
           The Beastcaller is the embodiment of primal might and savagery. Vanquish hordes of foes on the battlefield with crushing blows from your massive spirit axe, while coordinating your attacks with an Aether Fox companion – and other summoned beasts.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      show: false,
    }),
  }
</script>