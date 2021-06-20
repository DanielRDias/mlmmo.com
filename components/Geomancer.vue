<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="../assets/classes/geomancer-class-magic-legends-wiki-guide-300px.jpg"
      height="200px"
    ></v-img>

    <v-card-title> Geomancer </v-card-title>

    <v-card-subtitle> Red </v-card-subtitle>

    <v-card-actions>
      <v-btn color="red darken-2" text> More Information </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          The Geomancer draws upon the power of the Earth to pummel enemies in
          close quarters with devastating stone and lava attacks. They are
          capable of absorbing blows that would otherwise incapacitate other
          Planeswalkers with their rock shield. Geomancers prefer to call upon
          creatures like goblins, kavu, and earth elementals.
          <br />
          <a href="/geomancerlore">
            Click here to read about the Geomancer Lore
          </a>
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