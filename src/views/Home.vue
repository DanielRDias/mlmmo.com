<template>
  <div class="home">
      <v-container>
        <v-row>
          <v-col>
                <Sanctifier />
          </v-col>
          <v-col>
                <Geomancer />
          </v-col>
          <v-col>
                <Beastcaller />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
                <Mindmage />
          </v-col>
          <v-col>
                <Necromancer />
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Mindmage from "@/components/Mindmage.vue";
import Geomancer from "@/components/Geomancer.vue";
import Beastcaller from "@/components/Beastcaller.vue";
import Sanctifier from "@/components/Sanctifier.vue";
import Necromancer from "@/components/Necromancer.vue";

export default {
  name: "Home",
  components: {
    Mindmage,
    Geomancer,
    Beastcaller,
    Sanctifier,
    Necromancer,
  },
};
</script>
