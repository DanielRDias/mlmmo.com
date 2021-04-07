<template>
  <v-card>
    <v-card-title>{{ currentLoadout.name }}</v-card-title>
    <v-card-subtitle>Made by {{ currentLoadout.owner }}</v-card-subtitle>
    <v-row>
      <v-col v-if="currentLoadout.imgUrl" cols="6" align="center">
        <v-img :src="currentLoadout.imgUrl" max-height="400" max-width="400">
        </v-img>
      </v-col>
      <v-col cols="6">
        {{ currentLoadout.shortDescription }}
      </v-col>
    </v-row>
    <v-row v-if="currentLoadout.youtubeUrl">
      <v-col> </v-col>
      <v-col>
        <youtube :video-id="videoId"> </youtube>
      </v-col>
      <v-col> </v-col>
    </v-row>

    <v-card>
      <v-card-title> Class: {{ currentLoadout.class }} </v-card-title>
      <v-row>
        <v-col cols="12" md="6" sm="12" class="pa-10">
          {{ currentLoadout.longDescription }}
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-skeleton-loader
            v-if="currentLoadout.deck == null"
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
          <Deck
            v-else
            :deck-id="currentLoadout.deck"
            :key="currentLoadout.deck"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-card-title> Artifacts </v-card-title>
      <v-row>
        <v-col cols="12">
          <Artifact
            v-if="artifactLegendaryList[0]"
            :currentArtifactInput="artifactLegendaryList[0]"
          />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <Artifact
            v-if="artifactGreaterList[0]"
            :currentArtifactInput="artifactGreaterList[0]"
          />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <Artifact
            v-if="artifactGreaterList[1]"
            :currentArtifactInput="artifactGreaterList[1]"
          />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <Artifact
            v-if="artifactLesserList[2]"
            :currentArtifactInput="artifactLesserList[2]"
          />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <Artifact
            v-if="artifactLesserList[1]"
            :currentArtifactInput="artifactLesserList[1]"
          />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <Artifact
            v-if="artifactLesserList[2]"
            :currentArtifactInput="artifactLesserList[2]"
          />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-card-title>Equipment</v-card-title>
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <Equipment v-if="headList[0]" :currentEquipmentInput="headList[0]" />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <Equipment v-if="bodyList[0]" :currentEquipmentInput="bodyList[0]" />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <Equipment v-if="armsList[0]" :currentEquipmentInput="armsList[0]" />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <Equipment v-if="feetList[0]" :currentEquipmentInput="feetList[0]" />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <Equipment
            v-if="accessoryList[0]"
            :currentEquipmentInput="accessoryList[0]"
          />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <Equipment
            v-if="accessoryList[1]"
            :currentEquipmentInput="accessoryList[1]"
          />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="card-avatar"
          >
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import Deck from "@/components/Deck.vue";
import Equipment from "@/components/Equipment.vue";
import Artifact from "@/components/Artifact.vue";
import { getIdFromURL, getTimeFromURL } from "vue-youtube-embed";

export default {
  props: {
    currentLoadoutId: {
      type: String,
      required: false,
      default: null,
    },
  },
  components: {
    Deck,
    Equipment,
    Artifact,
  },
  data() {
    return {
      currentLoadout: {
        name: null,
        owner: "anonymous",
        ownerId: "anonymous",
        imgUrl: null,
        youtubeUrl: null,
        type: null,
        shortDescription: "",
        longDescription: "",
        class: null,
        deck: null,
        equipments: [],
        artifacts: [],
      },
      videoId: null,
      startTime: null,

      equipments: [],
      headList: [],
      bodyList: [],
      armsList: [],
      feetList: [],
      accessoryList: [],

      artifacts: [],
      artifactLegendaryList: [],
      artifactGreaterList: [],
      artifactLesserList: [],
    };
  },
  async mounted() {
    this.getLoadoutData = await this.$store.dispatch(
      "cardInfo/getLoadout",
      this.$props.currentLoadoutId
    );
    this.currentLoadout = this.getLoadoutData.data.getLoadout;
  },
  methods: {},
  watch: {
    artifacts() {
      this.artifactLegendaryList = [];
      this.artifactGreaterList = [];
      this.artifactLesserList = [];
      this.artifacts.forEach((artifact) => {
        if (artifact.tier) {
          let tier = artifact.tier.toLowerCase();
          switch (tier) {
            case "legendary":
              this.artifactLegendaryList.push(artifact);
              break;
            case "greater":
              this.artifactGreaterList.push(artifact);
              break;
            case "lesser":
              this.artifactLesserList.push(artifact);
              break;
          }
        }
      });
      this.loadingArtifacts = false;
    },
    equipments() {
      this.headList = [];
      this.bodyList = [];
      this.armsList = [];
      this.feetList = [];
      this.accessoryList = [];
      this.equipments.forEach((equipment) => {
        if (equipment.slot) {
          let slot = equipment.slot.toLowerCase();
          switch (slot) {
            case "head":
              this.headList.push(equipment);
              break;
            case "body":
              this.bodyList.push(equipment);
              break;
            case "arms":
              this.armsList.push(equipment);
              break;
            case "feet":
              this.feetList.push(equipment);
              break;
            case "accessory":
              this.accessoryList.push(equipment);
              break;
          }
        }
      });
      this.loadingEquipments = false;
    },
    currentLoadout() {
      if (this.currentLoadout.youtubeUrl) {
        this.videoId = getIdFromURL(this.currentLoadout.youtubeUrl);
        this.startTime = getTimeFromURL(this.currentLoadout.youtubeUrl);
      }
      this.equipments = this.currentLoadout.equipments;
      this.artifacts = this.currentLoadout.artifacts;
    },
  },
};
</script>
