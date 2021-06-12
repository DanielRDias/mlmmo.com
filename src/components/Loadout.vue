<template>
  <div>
    <v-skeleton-loader
      v-if="currentLoadout.deck == null"
      class="mx-auto"
      max-width="300"
      max-height="300"
      type="card-avatar"
    >
    </v-skeleton-loader>
    <v-row v-else class="mt-1">
      <v-col cols="12" xs="12" sm="12" md="4" lg="4" class="ml-1">
        <v-card>
          <v-card-title>{{ currentLoadout.name }}</v-card-title>
          <v-card-subtitle>Made by {{ currentLoadout.owner }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="8" lg="8" class="ml-n1">
        <div class="deckloadlout">
          <Deck
            :deck-id="currentLoadout.deck"
            :key="currentLoadout.deck"
            :showheader="false"
          />
        </div>
      </v-col>
    </v-row>
    <v-skeleton-loader
      v-if="loadingEquipments"
      class="mx-auto"
      type="table-row: table-cell@7"
    >
    </v-skeleton-loader>
    <v-row v-else>
      <v-col cols="12" xs="12" sm="12" md="4" lg="4" class="ml-1">
        <div class="loadoutequip">
          <div class="traits">
            <div class="trait-wrapper">
              <a href="https://wiki.mlarpg.com/wiki/Trait" target="_blank">
                <img
                  :src="trait0"
                  :alt="
                    currentLoadout.traits
                      ? currentLoadout.traits[0]
                      : 'Magic: Legends trait'
                  "
                />
              </a>
            </div>
            <div class="trait-wrapper">
              <a href="https://wiki.mlarpg.com/wiki/Trait" target="_blank">
                <img
                  :src="trait1"
                  :alt="
                    currentLoadout.traits
                      ? currentLoadout.traits[1]
                      : 'Magic: Legends trait'
                  "
                />
              </a>
            </div>
            <div class="trait-wrapper">
              <a href="https://wiki.mlarpg.com/wiki/Trait" target="_blank">
                <img
                  :src="trait2"
                  :alt="
                    currentLoadout.traits
                      ? currentLoadout.traits[2]
                      : 'Magic: Legends trait'
                  "
                />
              </a>
            </div>
          </div>
          <div class="equip-container-class" :class="classBg"></div>
          <div class="equip-container-head">
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <img :src="headList[0].imgUrl" class="equip-image" />
                </span>
              </template>
              <span>
                <Equipment :currentEquipmentInput="headList[0]" />
              </span>
            </v-tooltip>
          </div>
          <div class="equip-container-body">
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <img :src="bodyList[0].imgUrl" class="equip-image" />
                </span>
              </template>
              <span>
                <Equipment :currentEquipmentInput="bodyList[0]" />
              </span>
            </v-tooltip>
          </div>
          <div class="equip-container-arms">
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <img :src="armsList[0].imgUrl" class="equip-image" />
                </span>
              </template>
              <span>
                <Equipment :currentEquipmentInput="armsList[0]" />
              </span>
            </v-tooltip>
          </div>
          <div class="equip-container-accessory1">
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <img :src="accessoryList[0].imgUrl" class="equip-image" />
                </span>
              </template>
              <span>
                <Equipment :currentEquipmentInput="accessoryList[0]" />
              </span>
            </v-tooltip>
          </div>
          <div class="equip-container-accessory2">
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <img :src="accessoryList[1].imgUrl" class="equip-image" />
                </span>
              </template>
              <span>
                <Equipment :currentEquipmentInput="accessoryList[1]" />
              </span>
            </v-tooltip>
          </div>
          <div class="equip-container-feet">
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <img :src="feetList[0].imgUrl" class="equip-image" />
                </span>
              </template>
              <span>
                <Equipment :currentEquipmentInput="feetList[0]" />
              </span>
            </v-tooltip>
          </div>
        </div>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="1" lg="1">
        <div v-if="mobile" class="artifact-loadout-wapper-mobile">
          <v-col cols="12" xs="12" sm="12" md="6" lg="6">
            <v-row>
              <v-col cols="1"> </v-col>
              <v-col cols="3"> </v-col>
              <v-col cols="4">
                <v-tooltip right open-delay="500" transition="none">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
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
                    </span>
                  </template>
                  <span>
                    <Artifact
                      :currentArtifactInput="artifactLegendaryList[0]"
                    />
                  </span>
                </v-tooltip>
              </v-col>
              <v-col cols="1"> </v-col>
              <v-col cols="3"> </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"> </v-col>
              <v-col cols="3">
                <v-tooltip right open-delay="500" transition="none">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
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
                    </span>
                  </template>
                  <span>
                    <Artifact :currentArtifactInput="artifactGreaterList[0]" />
                  </span>
                </v-tooltip>
              </v-col>
              <v-col cols="2"> </v-col>
              <v-col cols="3">
                <v-tooltip right open-delay="500" transition="none">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
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
                    </span>
                  </template>
                  <span>
                    <Artifact :currentArtifactInput="artifactGreaterList[1]" />
                  </span>
                </v-tooltip>
              </v-col>
              <v-col cols="2"> </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-tooltip right open-delay="500" transition="none">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      <div class="artifact-wrapper">
                        <img
                          class="artifact-image"
                          :src="artifactLesserList[0].imgUrl"
                        />
                        <img
                          class="artifact-frame"
                          src="/img/tier/artifact-builder-lesser.svg"
                        />
                      </div>
                    </span>
                  </template>
                  <span>
                    <Artifact :currentArtifactInput="artifactLesserList[0]" />
                  </span>
                </v-tooltip>
              </v-col>
              <v-col cols="1"> </v-col>
              <v-col cols="3">
                <v-tooltip right open-delay="500" transition="none">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      <div class="artifact-wrapper">
                        <img
                          class="artifact-image"
                          :src="artifactLesserList[1].imgUrl"
                        />
                        <img
                          class="artifact-frame"
                          src="/img/tier/artifact-builder-lesser.svg"
                        />
                      </div>
                    </span>
                  </template>
                  <span>
                    <Artifact :currentArtifactInput="artifactLesserList[1]" />
                  </span>
                </v-tooltip>
              </v-col>
              <v-col cols="1"> </v-col>
              <v-col cols="3">
                <v-tooltip right open-delay="500" transition="none">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      <div class="artifact-wrapper">
                        <img
                          class="artifact-image"
                          :src="artifactLesserList[2].imgUrl"
                        />
                        <img
                          class="artifact-frame"
                          src="/img/tier/artifact-builder-lesser.svg"
                        />
                      </div>
                    </span>
                  </template>
                  <span>
                    <Artifact :currentArtifactInput="artifactLesserList[2]" />
                  </span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>
        </div>
        <div v-else class="artifact-loadout-wapper">
          <v-row>
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
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
                </span>
              </template>
              <span>
                <Artifact :currentArtifactInput="artifactLegendaryList[0]" />
              </span>
            </v-tooltip>
          </v-row>
          <br />
          <v-row>
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
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
                </span>
              </template>
              <span>
                <Artifact :currentArtifactInput="artifactGreaterList[0]" />
              </span>
            </v-tooltip>
          </v-row>
          <v-row>
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
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
                </span>
              </template>
              <span>
                <Artifact :currentArtifactInput="artifactGreaterList[1]" />
              </span>
            </v-tooltip>
          </v-row>
          <br />
          <v-row>
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <div class="artifact-wrapper">
                    <img
                      class="artifact-image"
                      :src="artifactLesserList[0].imgUrl"
                    />
                    <img
                      class="artifact-frame"
                      src="/img/tier/artifact-builder-lesser.svg"
                    />
                  </div>
                </span>
              </template>
              <span>
                <Artifact :currentArtifactInput="artifactLesserList[0]" />
              </span>
            </v-tooltip>
          </v-row>
          <v-row>
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <div class="artifact-wrapper">
                    <img
                      class="artifact-image"
                      :src="artifactLesserList[1].imgUrl"
                    />
                    <img
                      class="artifact-frame"
                      src="/img/tier/artifact-builder-lesser.svg"
                    />
                  </div>
                </span>
              </template>
              <span>
                <Artifact :currentArtifactInput="artifactLesserList[1]" />
              </span>
            </v-tooltip>
          </v-row>
          <v-row>
            <v-tooltip right open-delay="500" transition="none">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <div class="artifact-wrapper">
                    <img
                      class="artifact-image"
                      :src="artifactLesserList[2].imgUrl"
                    />
                    <img
                      class="artifact-frame"
                      src="/img/tier/artifact-builder-lesser.svg"
                    />
                  </div>
                </span>
              </template>
              <span>
                <Artifact :currentArtifactInput="artifactLesserList[2]" />
              </span>
            </v-tooltip>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="7" lg="7" class="ml-n1">
        <br />
        <v-row style="white-space: pre-line" class="pa-5">
          <strong> Intro: </strong> <br />
          {{ currentLoadout.shortDescription }}
        </v-row>
        <br />
        <br />
        <v-row style="white-space: pre-line" class="pa-5">
          <strong> Guide: </strong> <br />
          {{ currentLoadout.longDescription }}
        </v-row>
      </v-col>
    </v-row>
    <br /><br />
    <v-row align="center" justify="center">
      <v-col
        v-if="currentLoadout.imgUrl"
        xs="12"
        sm="12"
        md="6"
        lg="6"
        class="pa-5"
      >
        <v-img :src="currentLoadout.imgUrl" max-height="400" max-width="400">
        </v-img>
      </v-col>
      <v-col
        v-if="currentLoadout.youtubeUrl"
        xs="12"
        sm="12"
        md="6"
        lg="6"
        class="pa-5"
      >
        <youtube :video-id="videoId"> </youtube>
      </v-col>
    </v-row>
    <br /><br />
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
    currentLoadoutInput: {
      type: Object,
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
      loadingEquipments: true,
      classBg: "none",
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
        traits: ["", "", ""],
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
    await this.$store.dispatch("cardInfo/getCardsData");
    if (this.$props.currentLoadoutInput !== null) {
      this.currentLoadout = this.$props.currentLoadoutInput;
    } else if (this.$props.currentLoadoutId !== null) {
      this.getLoadoutData = await this.$store.dispatch(
        "loadout/getLoadout",
        this.$props.currentLoadoutId
      );
      this.currentLoadout = this.getLoadoutData.data.getLoadout;
    }
  },
  methods: {
    traitImg(traitName) {
      let traitImg = "/logo.png";

      switch (traitName.toLowerCase()) {
        case "aether aggression":
          traitImg = "/img/loadout/traits/105px-Trait_aether_aggressionout.png";
          break;
        case "geomancer heartofiron":
          traitImg =
            "/img/loadout/traits/105px-Trait_geomancer_heartofironout.png";
          break;
        case "mindmage psychicprowess":
          traitImg =
            "/img/loadout/traits/105px-Trait_mindmage_psychicprowessout.png";
          break;
        case "pyromancer finale of flames":
          traitImg =
            "/img/loadout/traits/105px-Trait_pyromancer_finale_of_flamesout.png";
          break;
        case "assassin disinformation":
          traitImg =
            "/img/loadout/traits/105px-Trait_assassin_disinformationout.png";
          break;
        case "intimidating roar":
          traitImg = "/img/loadout/traits/105px-Trait_intimidating_roarout.png";
          break;
        case "natures generousity":
          traitImg =
            "/img/loadout/traits/105px-Trait_natures_generousityout.png";
          break;
        case "sanctifier wardof the sanctifier":
          traitImg =
            "/img/loadout/traits/105px-Trait_sanctifier_wardofthesanctifierout.png";
          break;
        case "beastcaller primal rage":
          traitImg =
            "/img/loadout/traits/105px-Trait_beastcaller_primalrageout.png";
          break;
        case "might from unity":
          traitImg = "/img/loadout/traits/105px-Trait_might_from_unityout.png";
          break;
        case "necromancer necrotic burst":
          traitImg =
            "/img/loadout/traits/105px-Trait_necromancer_necroticburstout.png";
          break;
      }
      return traitImg;
    },
  },
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
    currentLoadout: {
      handler(currentLoadout) {
        if (this.currentLoadout.youtubeUrl) {
          this.videoId = getIdFromURL(this.currentLoadout.youtubeUrl);
          this.startTime = getTimeFromURL(this.currentLoadout.youtubeUrl);
        }
        this.equipments = this.currentLoadout.equipments;
        this.artifacts = this.currentLoadout.artifacts;
        switch (this.currentLoadout.class.toLowerCase()) {
          case "sanctifier":
            this.classBg = "sanctifier-bg";
            break;
          case "mind mage":
            this.classBg = "mindmage-bg";
            break;
          case "necromancer":
            this.classBg = "necromancer-bg";
            break;
          case "geomancer":
            this.classBg = "geomancer-bg";
            break;
          case "pyromancer":
            this.classBg = "pyromancer-bg";
            break;
          case "beast caller":
            this.classBg = "beastcaller-bg";
            break;
          case "dimir assassin":
            this.classBg = "dimir-bg";
            break;
        }
      },
      deep: true,
    },
  },
  computed: {
    mobile() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return true;
        case "sm":
          return true;
        case "md":
          return false;
        case "lg":
          return false;
        case "xl":
          return false;
      }
      return false;
    },
    trait0() {
      if (this.currentLoadout.traits) {
        return this.traitImg(this.currentLoadout.traits[0]);
      } else {
        return "/logo.png";
      }
    },
    trait1() {
      if (this.currentLoadout.traits) {
        return this.traitImg(this.currentLoadout.traits[1]);
      } else {
        return "/logo.png";
      }
    },
    trait2() {
      if (this.currentLoadout.traits) {
        return this.traitImg(this.currentLoadout.traits[2]);
      } else {
        return "/logo.png";
      }
    },
  },
};
</script>

<style scoped>
.deckloadlout {
  position: relative;
}

.sanctifier-bg {
  background-image: url(/img/loadout/sanctifier-icon.png);
}

.mindmage-bg {
  background-image: url(/img/loadout/mindmage-icon.png);
}

.necromancer-bg {
  background-image: url(/img/loadout/necromancer-icon.png);
}

.geomancer-bg {
  background-image: url(/img/loadout/geomancer-icon.png);
}

.pyromancer-bg {
  background-image: url(/img/loadout/pyromancer-icon.png);
}

.beastcaller-bg {
  background-image: url(/img/loadout/beastcaller-icon.png);
}

.dimir-bg {
  background-image: url(/img/loadout/dimir-icon.png);
}

.loadoutequip {
  background-image: url(/img/loadout/loadout_blank-min.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  margin: auto;
  width: 100%;
  padding-bottom: 120%; /* 5:6  */
  position: relative;
}

.traits {
  width: 100%;
  text-align: center;
}

.trait-wrapper {
  display: inline-block;
  background-image: url("https://i.imgur.com/IK0f6vr.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-top: 2%;
  margin-left: 2%;
  margin-right: 2%;

  width: 20%;
  height: 20%;
  position: relative;
}

.trait-wrapper img {
  display: inline-block;
  width: 90%;
  height: 90%;
  margin-top: 5%;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.equip-container-head {
  width: 18%;
  height: 18%;
  position: absolute;
  margin-left: 40.3%;
  margin-top: 15.5%;
}

.equip-container-body {
  width: 18%;
  height: 18%;
  position: absolute;
  margin-left: 13.1%;
  margin-top: 31.5%;
}

.equip-container-arms {
  width: 18%;
  height: 18%;
  position: absolute;
  margin-left: 67.9%;
  margin-top: 31.5%;
}

.equip-container-accessory1 {
  width: 18%;
  height: 18%;
  position: absolute;
  margin-left: 13.1%;
  margin-top: 63.5%;
}

.equip-container-accessory2 {
  width: 18%;
  height: 18%;
  position: absolute;
  margin-left: 67.9%;
  margin-top: 63.5%;
}

.equip-container-feet {
  width: 18%;
  height: 18%;
  position: absolute;
  margin-left: 40.3%;
  margin-top: 79.1%;
}

.equip-container-class {
  width: 30%;
  height: 25%;
  position: absolute;
  margin-left: 35%;
  margin-top: 35%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.equip-image {
  width: 100%;
  clip-path: circle(50%);
}

.artifact-loadout-wapper > * {
  display: block;
  max-width: 120px;
  margin: auto;
  padding: 10px;
}

.artifact-wrapper {
  border: 0px solid red;
  position: relative;
  display: flex;
  justify-content: center;
}

.artifact-image {
  width: 90%;
  height: 90%;
  margin-top: 5%;
  clip-path: circle(50%);
  position: relative;
}

.artifact-frame {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>