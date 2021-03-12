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
              <Artifact
                :currentArtifactId="item.id"
                :key="item.updatedAt"
                v-if="manageType === 'artifacts'"
              />
              <Equipment
                :currentEquipmentId="item.id"
                :key="item.updatedAt"
                v-if="manageType === 'equipments'"
              />
              <Card
                :currentCardId="item.id"
                :key="item.updatedAt"
                v-if="manageType === 'cards'"
              />
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
                v-if="manageType === 'artifacts'"
              />
              <Equipment
                :currentEquipmentInput="version"
                :key="version.updatedAt"
                v-if="manageType === 'equipments'"
              />
              <Card
                :currentCardInput="version"
                :key="version.updatedAt"
                v-if="manageType === 'cards'"
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
import Equipment from "@/components/Equipment.vue";
import Card from "@/components/Card.vue";

export default {
  components: {
    Artifact,
    Equipment,
    Card,
  },
  data: () => ({
    model: 0,
    items: [],
    loading: false,
    manageType: null,
  }),
  async mounted() {
    this.manageType = this.$route.query.manageType;
    switch (this.manageType) {
      case "cards":
        this.$store.dispatch("cardInfo/getCardsVersionsData");
        this.$store.dispatch("cardInfo/getCardsData");
        break;
      case "artifacts":
        this.$store.dispatch("cardInfo/getArtifactsVersionsData");
        this.$store.dispatch("cardInfo/getArtifactsData");
        break;
      case "equipments":
        this.$store.dispatch("cardInfo/getEquipmentsVersionsData");
        this.$store.dispatch("cardInfo/getEquipmentsData");
        break;
      default:
        alert("error: unknown manage type");
        console.log("error: unknown manage type");
    }
  },
  methods: {
    async approve(item, position) {
      this.loading = true;
      switch (this.manageType) {
        case "cards":
          await this.$store.dispatch({
            type: "cardInfo/updateCard",
            cardData: item,
          });

          await this.$store.dispatch({
            type: "cardInfo/deleteSubmitCard",
            cardData: item,
            position: position,
          });
          await this.$store.dispatch("cardInfo/getCardsVersionsData");
          await this.$store.dispatch("cardInfo/getCardsData");
          break;
        case "artifacts":
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
          break;
        case "equipments":
          await this.$store.dispatch({
            type: "cardInfo/updateEquipment",
            equipmentData: item,
          });

          await this.$store.dispatch({
            type: "cardInfo/deleteSubmitEquipment",
            equipmentData: item,
            position: position,
          });
          await this.$store.dispatch("cardInfo/getEquipmentsVersionsData");
          await this.$store.dispatch("cardInfo/getEquipmentsData");
          break;
        default:
          alert("error: unknown manage type");
          console.log("error: unknown manage type");
          this.loading = false;
          return;
      }
      this.loading = false;
    },
    async reject(item, position) {
      this.loading = true;

      switch (this.manageType) {
        case "cards":
          await this.$store.dispatch({
            type: "cardInfo/deleteSubmitCard",
            cardData: item,
            position: position,
          });
          await this.$store.dispatch("cardInfo/getCardsVersionsData");
          await this.$store.dispatch("cardInfo/getCardsData");
          break;
        case "artifacts":
          await this.$store.dispatch({
            type: "cardInfo/deleteSubmitArtifact",
            artifactData: item,
            position: position,
          });
          await this.$store.dispatch("cardInfo/getArtifactsVersionsData");
          await this.$store.dispatch("cardInfo/getArtifactsData");
          break;
        case "equipments":
          await this.$store.dispatch({
            type: "cardInfo/deleteSubmitEquipment",
            equipmentData: item,
            position: position,
          });
          await this.$store.dispatch("cardInfo/getEquipmentsVersionsData");
          await this.$store.dispatch("cardInfo/getEquipmentsData");
          break;
        default:
          alert("error: unknown manage type");
          console.log("error: unknown manage type");
          this.loading = false;
          return;
      }
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
      equipments: "cardInfo/equipments",
      equipmentVersions: "cardInfo/equipmentVersions",
    }),
  },
  watch: {
    artifactVersions(artifactVersions) {
      this.items = artifactVersions.filter(
        (item) => item.newVersions.length > 0
      );
    },
    cardVersions(cardVersions) {
      this.items = cardVersions.filter((item) => item.newVersions.length > 0);
    },
    equipmentVersions(equipmentVersions) {
      this.items = equipmentVersions.filter(
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