<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <Sanctifier />
        </v-col>
        <v-col>
          <Mindmage />
        </v-col>
        <v-col>
          <Necromancer />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Geomancer />
        </v-col>
        <v-col>
          <Beastcaller />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Sanctifier from "@/components/Sanctifier.vue";
import Mindmage from "@/components/Mindmage.vue";
import Necromancer from "@/components/Necromancer.vue";
import Geomancer from "@/components/Geomancer.vue";
import Beastcaller from "@/components/Beastcaller.vue";

export default {
  name: "Home",
  components: {
    Sanctifier,
    Mindmage,
    Necromancer,
    Geomancer,
    Beastcaller,
  },
};
</script>
