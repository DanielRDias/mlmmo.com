<template>
  <v-card>
    <v-overlay :value="loading ? true : false">
      <v-progress-circular
        indeterminate
        size="64"
        v-if="loading && !sucessMsg && errorMsg ? true : false"
      ></v-progress-circular>
      <v-alert type="success" v-if="sucessMsg">{{ sucessMsg }}</v-alert>
      <v-alert type="error" v-if="errorMsg">{{ errorMsg }}</v-alert>
      <v-btn text @click="loading = false"> Close </v-btn>
    </v-overlay>
    <v-card-title> Loadout </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="loadout.name"
            label="Loadout Name"
            placeholder="Loadout Name"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6" align="center">
          <v-text-field
            v-model="loadout.imgUrl"
            label="Loadout Image URL"
            placeholder="Enter the link to a image uploaded to imgur.com"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            counter="250"
            :rules="rulesShortDesc"
            v-model="loadout.shortDescription"
            label="Loadout short description"
            placeholder="Write a short description to introduce your loadout"
          />
        </v-col>
        <v-col cols="6" align="center">
          <v-img
            v-if="(loadout.imgUrl !== null) & (loadout.imgUrl !== '')"
            :src="loadout.imgUrl"
            max-width="300"
            max-height="300"
          >
          </v-img>
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="image"
          >
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="loadout.type"
            label="Loadout type"
            placeholder="Example: combo, control, aggro/dps or difficulty/map specific"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="loadout.youtubeUrl"
            label="Loadout Youtube URL"
            placeholder="Enter the link to your loadout youtube video (optional)"
            @input="getYoutubeInfo"
          >
          </v-text-field>
          <br />
          <v-autocomplete
            v-model="loadout.class"
            :items="classList"
            :search-input.sync="searchClass"
            item-text="Description"
            label="Class"
            placeholder="Start typing to Search"
            prepend-icon="mdi-badge-account"
            return-object
          >
          </v-autocomplete>
        </v-col>
        <v-col>
          <youtube
            v-if="(videoId !== null) & (videoId !== '')"
            :video-id="videoId"
          ></youtube>
          <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            max-height="300"
            type="image"
          >
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-progress-linear
        v-if="loadingDeck"
        indeterminate
        color="deep-purple accent-4"
        height="6"
      >
      </v-progress-linear>
      <v-autocomplete
        v-model="selDeck"
        :items="deckList"
        :search-input.sync="searchDeck"
        item-text="name"
        item-value="name"
        label="Deck"
        placeholder="Start typing to Search"
        prepend-icon="mdi-cards"
        return-object
        :disabled="loadingDeck"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            @click="data.select"
          >
            <v-avatar left>
              <v-img :src="deckImgs[data.item.id]"></v-img>
            </v-avatar>
            {{ data.item.name }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template>
            <v-list-item-avatar>
              <img :src="deckImgs[data.item.id]" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle>
                Author: {{ data.item.owner }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>

      <v-skeleton-loader
        v-if="loadout.deck == null"
        class="mx-auto"
        max-width="300"
        max-height="300"
        type="card-avatar"
      >
      </v-skeleton-loader>
      <Deck v-else :deck-id="loadout.deck" :key="loadout.deck" />
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="12" align="center">
          <v-row>
            <v-col cols="4"> </v-col>
            <v-col cols="4">
              <v-progress-linear
                v-if="loadingArtifacts"
                indeterminate
                color="deep-purple accent-4"
                height="6"
              >
              </v-progress-linear>
              <v-autocomplete
                v-model="selLgArtifact"
                :items="artifactLegendaryList"
                item-text="name"
                item-value="name"
                label="Legendary Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
                :disabled="loadingArtifacts"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.imgUrl"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <img :src="data.item.imgUrl" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.description">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR10">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR20">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="4"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="2"> </v-col>
            <v-col cols="4">
              <v-autocomplete
                v-model="selGr1Artifact"
                :items="artifactGreaterList"
                item-text="name"
                item-value="name"
                label="Greater Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
                :disabled="loadingArtifacts"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.imgUrl"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <img :src="data.item.imgUrl" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.description">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR10">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR20">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                v-model="selGr2Artifact"
                :items="artifactGreaterList"
                item-text="name"
                item-value="name"
                label="Greater Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
                :disabled="loadingArtifacts"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.imgUrl"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <img :src="data.item.imgUrl" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.description">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR10">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR20">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="2"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-autocomplete
                v-model="selLs1Artifact"
                :items="artifactLesserList"
                item-text="name"
                item-value="name"
                label="Lesser Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
                :disabled="loadingArtifacts"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.imgUrl"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <img :src="data.item.imgUrl" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.description">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR10">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR20">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                v-model="selLs2Artifact"
                :items="artifactLesserList"
                item-text="name"
                item-value="name"
                label="Lesser Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
                :disabled="loadingArtifacts"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.imgUrl"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <img :src="data.item.imgUrl" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.description">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR10">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR20">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                v-model="selLs3Artifact"
                :items="artifactLesserList"
                item-text="name"
                item-value="name"
                label="Lesser Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
                :disabled="loadingArtifacts"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.imgUrl"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <img :src="data.item.imgUrl" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.description">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR10">
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-html="data.item.bonusR20">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-progress-linear
        v-if="loadingEquipments"
        indeterminate
        color="deep-purple accent-4"
        height="6"
      >
      </v-progress-linear>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="selHead"
            :items="headList"
            item-text="name"
            item-value="name"
            label="Head"
            placeholder="Start typing to Search"
            prepend-icon="mdi-redhat"
            return-object
            :disabled="loadingEquipments"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
              >
                <v-avatar left>
                  <v-img :src="data.item.imgUrl"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-item-avatar>
                  <img :src="data.item.imgUrl" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle v-html="data.item.description">
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="selBody"
            :items="bodyList"
            item-text="name"
            item-value="name"
            label="Body"
            placeholder="Start typing to Search"
            prepend-icon="mdi-tshirt-crew"
            return-object
            :disabled="loadingEquipments"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
              >
                <v-avatar left>
                  <v-img :src="data.item.imgUrl"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-item-avatar>
                  <img :src="data.item.imgUrl" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle v-html="data.item.description">
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="selArms"
            :items="armsList"
            item-text="name"
            item-value="name"
            label="Arms"
            placeholder="Start typing to Search"
            prepend-icon="mdi-mixed-martial-arts"
            return-object
            :disabled="loadingEquipments"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
              >
                <v-avatar left>
                  <v-img :src="data.item.imgUrl"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-item-avatar>
                  <img :src="data.item.imgUrl" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle v-html="data.item.description">
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="selFeet"
            :items="feetList"
            item-text="name"
            item-value="name"
            label="Feet"
            placeholder="Start typing to Search"
            prepend-icon="mdi-shoe-cleat"
            return-object
            :disabled="loadingEquipments"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
              >
                <v-avatar left>
                  <v-img :src="data.item.imgUrl"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-item-avatar>
                  <img :src="data.item.imgUrl" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle v-html="data.item.description">
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="selAccessory1"
            :items="accessoryList"
            item-text="name"
            item-value="name"
            label="Accessory 1"
            placeholder="Start typing to Search"
            prepend-icon="mdi-ring"
            return-object
            :disabled="loadingEquipments"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
              >
                <v-avatar left>
                  <v-img :src="data.item.imgUrl"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-item-avatar>
                  <img :src="data.item.imgUrl" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle v-html="data.item.description">
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="selAccessory2"
            :items="accessoryList"
            item-text="name"
            item-value="name"
            label="Accessory 2"
            placeholder="Start typing to Search"
            prepend-icon="mdi-ring"
            return-object
            :disabled="loadingEquipments"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
              >
                <v-avatar left>
                  <v-img :src="data.item.imgUrl"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-item-avatar>
                  <img :src="data.item.imgUrl" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle v-html="data.item.description">
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-textarea
        v-model="loadout.longDescription"
        label="Loadout full description"
        placeholder="Write a guide to explain how your loadout works"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        min-width="150"
        @click="submit"
        :disabled="loadingSubmit"
      >
        {{
          loadingSubmit
            ? "Add all required information before submit"
            : "Submit"
        }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Deck from "@/components/Deck.vue";
import { getIdFromURL, getTimeFromURL } from "vue-youtube-embed";

export default {
  components: {
    Deck,
  },
  data() {
    return {
      loading: false,
      sucessMsg: "",
      errorMsg: "",

      loadingSubmit: true,
      loadingDeck: true,
      loadingEquipments: true,
      loadingArtifacts: true,

      videoId: null,
      startTime: null,

      selDeck: null,
      selLgArtifact: null,
      selGr1Artifact: null,
      selGr2Artifact: null,
      selLs1Artifact: null,
      selLs2Artifact: null,
      selLs3Artifact: null,
      selHead: null,
      selBody: null,
      selArms: null,
      selFeet: null,
      selAccessory1: null,
      selAccessory2: null,

      searchClass: null,
      searchDeck: null,
      rulesShortDesc: [(v) => v.length <= 250 || "Max 250 characters"],
      loadout: {
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
      classList: [
        "Sanctifier",
        "Mind Mage",
        "Necromancer",
        "Geomancer",
        "Beast Caller",
      ],
      deckList: [],
      deckImgs: {},

      artifactLegendaryList: [],
      artifactGreaterList: [],
      artifactLesserList: [],

      headList: [],
      bodyList: [],
      armsList: [],
      feetList: [],
      accessoryList: [],
    };
  },
  async mounted() {
    this.$store.dispatch("cardInfo/getDecksData");
    this.$store.dispatch("cardInfo/getCardsData");
    this.$store.dispatch("cardInfo/getArtifactsData");
    this.$store.dispatch("cardInfo/getEquipmentsData");
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      decks: "cardInfo/decks",
      cards: "cardInfo/cards",
      artifacts: "cardInfo/artifacts",
      equipments: "cardInfo/equipments",
    }),
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        this.sucessMsg = "";
        this.errorMsg = "";

        if (this.user) {
          this.loadout.owner = this.user.username;
          this.loadout.ownerId = this.user.id;
        }
        let result = await this.$store.dispatch("cardInfo/createLoadout", {
          file: "",
          loadoutData: this.loadout,
        });
        this.sucessMsg = "Loadout Added";
      } catch (error) {
        this.errorMsg = error.errors[0].message;
        console.log("error adding the loadout", error);
      }
    },
    getYoutubeInfo(url) {
      console.log("url", url);
      this.videoId = getIdFromURL(url);
      this.startTime = getTimeFromURL(url);
    },
    updateLoadout(type, newVal, oldVal) {
      this.loadingDeck = true;
      this.loadingEquipments = true;
      this.loadingArtifacts = true;

      if (oldVal !== null) {
        let index = this.loadout[type].findIndex(
          (element) => element.id === oldVal.id
        );
        if (index > -1) {
          this.loadout[type].splice(index, 1);
        }
      }
      this.loadout[type].push(newVal);

      this.loadingDeck = false;
      this.loadingEquipments = false;
      this.loadingArtifacts = false;
    },
  },
  watch: {
    loadout: {
      handler(val) {
        if (
          val.name &&
          val.type &&
          val.shortDescription &&
          val.longDescription &&
          val.class &&
          val.deck &&
          val.equipments.length == 6 &&
          val.artifacts.length == 6
        ) {
          this.loadingSubmit = false;
        } else {
          this.loadingSubmit = true;
        }
      },
      deep: true,
    },
    decks() {
      this.deckList = this.decks;
    },
    cards() {
      if (this.decks) {
        let newDeckImgs = {};
        this.decks.forEach((deck) => {
          var index = this.cards
            .map(function (e) {
              return e.id;
            })
            .indexOf(deck.cards[Math.floor(Math.random() * Math.floor(11))]);
          if (index !== -1) {
            newDeckImgs[deck.id] = this.cards[index].imgUrl;
          } else {
            newDeckImgs[deck.id] = "logo.png";
          }
        });
        this.deckImgs = newDeckImgs;
      }
      this.loadingDeck = false;
    },
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

    selDeck: function (newVal) {
      this.loadout.deck = newVal.id;
    },
    selLgArtifact: function (newVal, oldVal) {
      this.updateLoadout("artifacts", newVal, oldVal);
    },
    selGr1Artifact: function (newVal, oldVal) {
      this.updateLoadout("artifacts", newVal, oldVal);
    },
    selGr2Artifact: function (newVal, oldVal) {
      this.updateLoadout("artifacts", newVal, oldVal);
    },
    selLs1Artifact: function (newVal, oldVal) {
      this.updateLoadout("artifacts", newVal, oldVal);
    },
    selLs2Artifact: function (newVal, oldVal) {
      this.updateLoadout("artifacts", newVal, oldVal);
    },
    selLs3Artifact: function (newVal, oldVal) {
      this.updateLoadout("artifacts", newVal, oldVal);
    },
    selHead: function (newVal, oldVal) {
      this.updateLoadout("equipments", newVal, oldVal);
    },
    selBody: function (newVal, oldVal) {
      this.updateLoadout("equipments", newVal, oldVal);
    },
    selArms: function (newVal, oldVal) {
      this.updateLoadout("equipments", newVal, oldVal);
    },
    selFeet: function (newVal, oldVal) {
      this.updateLoadout("equipments", newVal, oldVal);
    },
    selAccessory1: function (newVal, oldVal) {
      this.updateLoadout("equipments", newVal, oldVal);
    },
    selAccessory2: function (newVal, oldVal) {
      this.updateLoadout("equipments", newVal, oldVal);
    },
  },
};
</script>
