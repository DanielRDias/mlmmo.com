<template>
  <v-card>
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
        <v-col cols="6">
          <v-text-field
            v-model="loadout.type"
            label="Loadout type"
            placeholder="Example: combo, control, aggro/dps or difficulty/map specific"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-row>
        <v-col cols="6" align="center">
          <v-autocomplete
            v-model="loadout.deck"
            :items="deckList"
            :search-input.sync="searchDeck"
            item-text="name"
            item-value="name"
            label="Deck"
            placeholder="Start typing to Search"
            prepend-icon="mdi-cards"
            return-object
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
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
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
          <Deck v-else :deck-id="loadout.deck.id" :key="loadout.deck.id" />
        </v-col>
        <v-col cols="6" align="center">
          <v-row>
            <v-col cols="3"> </v-col>
            <v-col cols="6">
              <v-autocomplete
                :items="artifactLegendaryList"
                item-text="Legendary Artifact"
                label="Legendary Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="3"> </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                :items="artifactGreaterList"
                item-text="Greater Artifact"
                label="Greater Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
              >
              </v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                :items="artifactGreaterList"
                item-text="Greater Artifact"
                label="Greater Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
              >
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                :items="artifactLesserList"
                item-text="Lesser Artifact"
                label="Lesser Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
              >
              </v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                :items="artifactLesserList"
                item-text="Lesser Artifact"
                label="Lesser Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
              >
              </v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                :items="artifactLesserList"
                item-text="Lesser Artifact"
                label="Lesser Artifact"
                placeholder="Start typing to Search"
                prepend-icon="mdi-dots-triangle"
                return-object
              >
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-row>
        <v-col>
          <v-autocomplete
            :items="deckList"
            item-text="Head"
            label="Head"
            placeholder="Start typing to Search"
            prepend-icon="mdi-redhat"
            return-object
          >
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            :items="deckList"
            item-text="Body"
            label="Body"
            placeholder="Start typing to Search"
            prepend-icon="mdi-tshirt-crew"
            return-object
          >
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete
            :items="deckList"
            item-text="Arms"
            label="Arms"
            placeholder="Start typing to Search"
            prepend-icon="mdi-mixed-martial-arts"
            return-object
          >
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            :items="deckList"
            item-text="Feet"
            label="Feet"
            placeholder="Start typing to Search"
            prepend-icon="mdi-shoe-cleat"
            return-object
          >
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete
            :items="deckList"
            item-text="Accessory 1"
            label="Accessory 1"
            placeholder="Start typing to Search"
            prepend-icon="mdi-ring"
            return-object
          >
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            :items="deckList"
            item-text="Accessory 2"
            label="Accessory 2"
            placeholder="Start typing to Search"
            prepend-icon="mdi-ring"
            return-object
          >
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
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Deck from "@/components/Deck.vue";

export default {
  components: {
    Deck,
  },
  data() {
    return {
      searchClass: null,
      searchDeck: null,
      rulesShortDesc: [(v) => v.length <= 250 || "Max 250 characters"],
      loadout: {
        name: null,
        imgUrl: null,
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

      mtgSlot: [
        { name: "Head", image: "img/slot/head.svg" },
        { name: "Body", image: "img/slot/body.svg" },
        { name: "Arms", image: "img/slot/arms.svg" },
        { name: "Feet", image: "img/slot/feet.svg" },
        { name: "Accessory", image: "img/slot/accessory.svg" },
        { name: "All", image: "img/mana/C.svg" },
      ],
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
  watch: {
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
    },
  },
};
</script>