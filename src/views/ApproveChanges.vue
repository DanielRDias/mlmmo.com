<template>
  <v-card>
    <v-overlay :value="loading ? true : false">
      <v-progress-circular
        indeterminate
        size="64"
        v-if="loading ? true : false"
      ></v-progress-circular>
    </v-overlay>
    <v-carousel
      v-model="model"
      height="100%"
      hide-delimiters
      :show-arrows="true"
    >
      <v-carousel-item v-for="item in items" :key="item.id">
        <v-sheet height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-col class="current">
              <div class="text-center">Current item version</div>
              <Artifact :currentArtifactId="item.id" :key="item.updatedAt" />
            </v-col>
            <v-col
              v-for="(version, i) in item.newVersions"
              v-bind:key="item.newVersions[i].updatedAt"
            >
              <div class="text-center">
                Submission from {{ version.updatedBy }}
              </div>
              <Artifact
                :currentArtifactInput="version"
                :key="version.updatedAt"
              />
              <div class="text-center">
                <v-btn text color="green" @click="approve(version, i)">
                  Approve and update
                </v-btn>
                or
                <v-btn text color="red" @click="reject(version, i)">
                  Reject and delete
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-spacer />
    </v-carousel>
    <v-card-actions class="text-center"> </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Artifact from "@/components/Artifact.vue";

export default {
  components: {
    Artifact,
  },
  props: {
    manageType: {
      type: String,
      required: false,
      default: "artifacts",
    },
  },
  data: () => ({
    model: 0,
    items: [],
    loading: false,
  }),
  async mounted() {
    this.$store.dispatch("cardInfo/getArtifactsVersionsData");
    this.$store.dispatch("cardInfo/getArtifactsData");
    if (this.$props.manageType == "artifacts") {
      this.$store.dispatch("cardInfo/getArtifactsVersionsData");
      this.$store.dispatch("cardInfo/getArtifactsData");
    } else {
      console.log("unknown manage type");
    }
  },
  methods: {
    async approve(item, position) {
      this.loading = true;
      await this.$store.dispatch({
        type: "cardInfo/updateArtifact",
        artifactData: item,
      });

      await this.$store.dispatch({
        type: "cardInfo/deleteSubmitArtifact",
        artifactData: item,
        position: position,
      });
      await this.$store.dispatch("cardInfo/getArtifactsVersionsData");
      await this.$store.dispatch("cardInfo/getArtifactsData");
      this.loading = false;
    },
    async reject(item, position) {
      this.loading = true;
      await this.$store.dispatch({
        type: "cardInfo/deleteSubmitArtifact",
        artifactData: item,
        position: position,
      });
      await this.$store.dispatch("cardInfo/getArtifactsVersionsData");
      await this.$store.dispatch("cardInfo/getArtifactsData");
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      cards: "cardInfo/cards",
      cardVersions: "cardInfo/cardVersions",
      artifacts: "cardInfo/artifacts",
      artifactVersions: "cardInfo/artifactVersions",
    }),
  },
  watch: {
    artifactVersions(artifactVersions) {
      this.items = artifactVersions.filter(
        (item) => item.newVersions.length > 0
      );
    },
  },
};
</script>

<style scoped>
.current {
  border: 2px solid green;
  margin-left: 20px;
}
</style>