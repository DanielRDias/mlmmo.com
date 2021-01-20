<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="..\assets\classes\magic_legends_sanctifier_class_crop.jpg"
      height="200px"
    ></v-img>

    <v-card-title> Sanctifier </v-card-title>

    <v-card-subtitle> White </v-card-subtitle>

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
          The Sanctifier is a devout healer who maintains order on the battlefield by supporting their allies and summoned creatures alike. They can also heal players as they deal damage with Lifelink.
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