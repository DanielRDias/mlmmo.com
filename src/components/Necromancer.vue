<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="../assets/classes/magic_legends_necromancer_01.jpg"
      height="200px"
    ></v-img>

    <v-card-title> Necromancer </v-card-title>

    <v-card-subtitle> Black </v-card-subtitle>

    <v-card-actions>
      <v-btn text> More Information </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          Necromancer class will find themselves in a constant balancing act between life and death. Summoning creatures, sacrificing them for benefits, and whittling down opponents over time will be key to a Necromancer’s success.
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
};
</script>