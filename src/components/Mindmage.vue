<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="../assets/classes/mind-mage-class-magic-legends-wiki-guide-300px.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Mind Mage
    </v-card-title>

    <v-card-subtitle>
      Blue
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="blue lighten-1"
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
           The Mind Mage personifies cool intellect. As a planeswalker that
            focuses on psychic powers, battle enemies from a safe distance,
            controlling projectiles with telekinetic powers, and lockdown
            dangerous foes with spells that put them to sleep, or to turn them
            against their allies.
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