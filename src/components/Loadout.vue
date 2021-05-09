<template>
  <div>
    <div class="deckloadlout">
      <v-skeleton-loader
        v-if="currentLoadout.deck == null"
        class="mx-auto"
        max-width="300"
        max-height="300"
        type="card-avatar"
      >
      </v-skeleton-loader>
      <Deck v-else :deck-id="currentLoadout.deck" :key="currentLoadout.deck" />
    </div>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <div class="loadoutequip">
          <br /><br />
          <br /><br />
          <br /><br />
          <v-row>
            <v-col cols="1"> </v-col>
            <v-col cols="3"> </v-col>
            <v-col cols="4">
              <img :src="headList[0].imgUrl" class="artifact-image" />
            </v-col>
            <v-col cols="3"> </v-col>
            <v-col cols="1"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="1"> </v-col>
            <v-col cols="4">
              <img :src="bodyList[0].imgUrl" class="artifact-image" />
            </v-col>
            <v-col cols="2"> </v-col>
            <v-col cols="4">
              <img :src="armsList[0].imgUrl" class="artifact-image" />
            </v-col>
            <v-col cols="1"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="1"> </v-col>
            <v-col cols="4">
              <img :src="accessoryList[0].imgUrl" class="artifact-image" />
            </v-col>
            <v-col cols="2"> </v-col>
            <v-col cols="4">
              <img :src="accessoryList[1].imgUrl" class="artifact-image"
            /></v-col>
            <v-col cols="1"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="1"> </v-col>
            <v-col cols="3"> </v-col>
            <v-col cols="4">
              <img :src="feetList[0].imgUrl" class="artifact-image" />
            </v-col>
            <v-col cols="3"> </v-col>
            <v-col cols="1"> </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-row>
          <v-col cols="1"> </v-col>
          <v-col cols="3"> </v-col>
          <v-col cols="4">
            <div class="artifact-wrapper">
              <img
                class="artifact-image"
                :src="artifactLegendaryList[0].imgUrl"
              />
              <img
                class="artifact-frame"
                src="/img/tier/artifact-builder-legendary.svg"
              />
            </div>
          </v-col>
          <v-col cols="1"> </v-col>
          <v-col cols="3"> </v-col>
        </v-row>
        <v-row>
          <v-col cols="2"> </v-col>
          <v-col cols="3">
            <div class="artifact-wrapper">
              <img
                class="artifact-image"
                :src="artifactGreaterList[0].imgUrl"
              />
              <img
                class="artifact-frame"
                src="/img/tier/artifact-builder-greater.svg"
              />
            </div>
          </v-col>
          <v-col cols="2"> </v-col>
          <v-col cols="3">
            <div class="artifact-wrapper">
              <img
                class="artifact-image"
                :src="artifactGreaterList[1].imgUrl"
              />
              <img
                class="artifact-frame"
                src="/img/tier/artifact-builder-greater.svg"
              />
            </div>
          </v-col>
          <v-col cols="2"> </v-col>
        </v-row>
        <v-row>
          <v-col cols="2"> </v-col>
          <v-col cols="2">
            <div class="artifact-wrapper">
              <img class="artifact-image" :src="artifactLesserList[0].imgUrl" />
              <img
                class="artifact-frame"
                src="/img/tier/artifact-builder-lesser.svg"
              />
            </div>
          </v-col>
          <v-col cols="1"> </v-col>
          <v-col cols="2">
            <div class="artifact-wrapper">
              <img class="artifact-image" :src="artifactLesserList[1].imgUrl" />
              <img
                class="artifact-frame"
                src="/img/tier/artifact-builder-lesser.svg"
              />
            </div>
          </v-col>
          <v-col cols="1"> </v-col>
          <v-col cols="2">
            <div class="artifact-wrapper">
              <img class="artifact-image" :src="artifactLesserList[2].imgUrl" />
              <img
                class="artifact-frame"
                src="/img/tier/artifact-builder-lesser.svg"
              />
            </div>
            <v-col cols="2"> </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <br /><br />
    <!-- <div class="deckloadlout">
      <v-skeleton-loader
        v-if="currentLoadout.deck == null"
        class="mx-auto"
        max-width="300"
        max-height="300"
        type="card-avatar"
      >
      </v-skeleton-loader>
      <Deck v-else :deck-id="currentLoadout.deck" :key="currentLoadout.deck" />
    </div> -->
    <!-- 
      <v-row>
      <v-col cols="3" md="1" sm="2"> </v-col>
      <v-col cols="6" md="1" sm="8">
        <div class="artifact-wrapper">
          <img class="artifact-image" :src="artifactLegendaryList[0].imgUrl" />
          <img class="artifact-frame" src="https://svgshare.com/i/X2m.svg" />
        </div>
      </v-col>
      <v-col cols="3" md="1" sm="2"> </v-col>
      <v-col cols="1" md="1" sm="1"> </v-col>
      <v-col cols="5" md="1" sm="5">
        <div class="artifact-wrapper">
          <img class="artifact-image" :src="artifactGreaterList[0].imgUrl" />
          <img class="artifact-frame" src="https://svgshare.com/i/X2m.svg" />
        </div>
      </v-col>
      <v-col cols="5" md="1" sm="5">
        <div class="artifact-wrapper">
          <img class="artifact-image" :src="artifactGreaterList[1].imgUrl" />
          <img class="artifact-frame" src="https://svgshare.com/i/X2m.svg" />
        </div>
      </v-col>
      <v-col cols="1" md="1" sm="1"> </v-col>
      <v-col cols="4" md="1" sm="4">
        <div class="artifact-wrapper">
          <img class="artifact-image" :src="artifactLesserList[0].imgUrl" />
          <img class="artifact-frame" src="https://svgshare.com/i/X2m.svg" />
        </div>
      </v-col>
      <v-col cols="4" md="1" sm="4">
        <div class="artifact-wrapper">
          <img class="artifact-image" :src="artifactLesserList[1].imgUrl" />
          <img class="artifact-frame" src="https://svgshare.com/i/X2m.svg" />
        </div>
      </v-col>
      <v-col cols="4" md="1 " sm="4">
        <div class="artifact-wrapper">
          <img class="artifact-image" :src="artifactLesserList[2].imgUrl" />
          <img class="artifact-frame" src="https://svgshare.com/i/X2m.svg" />
        </div>
      </v-col>
    </v-row>
     -->
    <!-- <div class="loadout">a</div>
    <v-card>
      <v-card-title>{{ currentLoadout.name }}</v-card-title>
      <v-card-subtitle>Made by {{ currentLoadout.owner }}</v-card-subtitle>
      <v-row>
        <v-col v-if="currentLoadout.imgUrl" cols="6" align="center">
          <v-img :src="currentLoadout.imgUrl" max-height="400" max-width="400">
          </v-img>
        </v-col>
        <v-col cols="6" style="white-space: pre-line">
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
          <v-col
            cols="12"
            md="6"
            sm="12"
            class="pa-10"
            style="white-space: pre-line"
          >
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
              v-if="artifactLesserList[0]"
              :currentArtifactInput="artifactLesserList[0]"
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
            <Equipment
              v-if="headList[0]"
              :currentEquipmentInput="headList[0]"
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
              v-if="bodyList[0]"
              :currentEquipmentInput="bodyList[0]"
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
              v-if="armsList[0]"
              :currentEquipmentInput="armsList[0]"
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
              v-if="feetList[0]"
              :currentEquipmentInput="feetList[0]"
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
    </v-card> -->
  </div>
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
    await this.$store.dispatch("cardInfo/getCardsData");
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

<style scoped>
.loadout {
  width: 100%;
  min-height: 601px;
  margin: auto;
  background-image: url("/img/loadout/overlay.png");
}

.deckscale {
  transform: scale(0.55);
  position: absolute;
  left: -50px;
  top: -185px;
}

.deckloadlout {
  position: relative;
}

.loadoutequip {
  background-image: url(/img/loadout/necromancer1.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin: auto;
  max-width: 600px;
}

.necroloadout {
  background-image: url(https://i.imgur.com/GxTJA0w.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.artifact-wrapper {
  border: 0px solid red;
  position: relative;
  display: flex;
  justify-content: center;
}

.artifact-image {
  width: 90%;
  margin-top: 5%;
  clip-path: circle(50%);
  position: relative;
}

.artifact-frame {
  width: 100%;
  position: absolute;
}

/*
.artifact-legendary-wrapper {
  background: transparent url("/img/tier/artifact-builder-legendary.svg")
    no-repeat center center;
  background-size: contain;
  height: 130px;
  width: 130px;
  text-align: center;
  padding-top: 16px;
}

.artifact-legendary-wrapper img {
  width: 98px;
  height: 98px;
  clip-path: circle(50%);
}

.artifact-wrapper {
  height: 132px;
  width: 132px;
  text-align: center;
  background-size: 100px 100px;
  background-clip: border-box;
  border-radius: 200px 200px;
  background-position-x: 20px;
}

.artifact-wrapper img {
  width: 150px;
  height: 150px;
}
 .artifact-wrapper {
  background: transparent url("https://i.imgur.com/Pf7Oi6I.png") no-repeat
    center center;
  height: 132px;
  text-align: center;
  padding-top: 27px;
}

.artifact-wrapper img {
  width: 105px;
  height: 105px;
  clip-path: circle(50%);
} */
</style>