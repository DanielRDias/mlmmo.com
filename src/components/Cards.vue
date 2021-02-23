<template>
  <v-container fluid>
    <v-data-iterator
      :items="cards ? (filterCards.length > 0 ? filterCards : cards) : nocards"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :custom-sort="customSort"
      :sortBy="sortBy.toLowerCase()"
      :sortDesc="sortDesc"
      hide-default-footer
      class="elevation-1"
      loading
      loading-text="Loading... Please wait"
    >
      <template v-slot:header>
        <v-toolbar class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>

          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-select
                v-model="colorFilterSelect"
                @input="colorFilter"
                :items="mtgcolors"
                label="Filter cards by color"
              >
                <template v-slot:selection="{ item }">
                  <img :src="item.image" width="14" height="14" />
                  <v-spacer></v-spacer>
                  {{ item.name }}
                </template>
                <template v-slot:item="{ item }">
                  <img :src="item.image" width="14" height="14" />
                  <v-spacer></v-spacer>
                  {{ item.name }}
                </template>
              </v-select>
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-sort"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-list>
          </v-menu>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <div class="font-weight-bold text-no-wrap secondary">
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-if="deckEdit"
                      color="green"
                      v-bind="attrs"
                      v-on="on"
                      @click="addCardToDeck(item.id)"
                    >
                      mdi-plus-box
                    </v-icon>
                  </template>
                  <span>Add Card</span>
                </v-tooltip>
                {{ item.name }}
              </div>

              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card class="mx-auto">
                    <v-img
                      class="white--text align-top"
                      height="200px"
                      :src="item.imgUrl ? item.imgUrl : `logo.png`"
                    >
                      <div
                        class="font-weight-bold v-card--reveal"
                        v-html="convertManaString(item.cost)"
                      ></div>
                      <v-list dense class="v-card--over">
                        <v-list-item
                          v-for="(key, index) in filteredKeys"
                          :key="index"
                        >
                          <v-list-item-content
                            :class="{ 'blue--text': sortBy === key }"
                          >
                            {{ key }}:
                          </v-list-item-content>
                          <v-list-item-content
                            class="align-end"
                            :class="{ 'blue--text': sortBy === key }"
                          >
                            {{ item[key.toLowerCase()] }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-img>

                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#036358">
                        <v-row align-content="center">
                          <v-col>
                            <v-btn @click="getCardOverlay(item)">Preview</v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              :to="{
                                name: 'Card',
                                query: { cardId: item.id },
                              }"
                              target="_blank"
                            >
                              Open Card
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>

              <v-card-actions>
                <v-btn text color="teal accent-4" @click="reveal = true">
                  Show Description
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <v-card
                  v-if="reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
                  style="height: 100%"
                >
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-if="deckEdit"
                        color="green"
                        v-bind="attrs"
                        v-on="on"
                        @click="addCardToDeck(item.id)"
                      >
                        mdi-plus-box
                      </v-icon>
                    </template>
                    <span>Add Card</span>
                  </v-tooltip>
                  <div class="font-weight-bold text-no-wrap secondary">
                    Description:
                  </div>
                  <div>
                    {{ item["description"] }}
                  </div>
                  <v-card-actions class="pt-0">
                    <v-btn text color="teal accent-4" @click="reveal = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            small
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            small
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>

    <v-overlay :value="cardOverlay">
      <v-icon large @click="cardOverlay = false">mdi-close-box</v-icon>
      <v-card class="overflow-y-auto" max-height="600">
        <Card :current-card-id="currentCardId" />
      </v-card>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "@/components/Card.vue";

export default {
  props: {
    deckEdit: { type: Boolean, required: false, default: false },
  },
  components: {
    Card,
  },
  async mounted() {
    this.$store.dispatch("cardInfo/getCardsData");
  },
  data() {
    return {
      reveal: false,
      cardOverlay: false,
      currentCardId: "",
      nocards: [],
      filterCards: [],
      itemsPerPageArray: [1, 4, 8, 12, 20, 30, 60, 100, 200, 400],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: "color",
      cardRank: "1",
      keys: ["Name", "CMC", "Color", "Type", "Points", "Description"],
      ranks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      properties: [
        "Rank",
        "Damage",
        "Health",
        "DPS",
        "Role",
        "Duration",
        "Range",
        "Area",
      ],
      colorFilterSelect: { name: "All", image: "img/mana/C.svg" },
      mtgcolors: [
        { name: "White", image: "img/mana/W.svg" },
        { name: "Blue", image: "img/mana/U.svg" },
        { name: "Black", image: "img/mana/B.svg" },
        { name: "Red", image: "img/mana/R.svg" },
        { name: "Green", image: "img/mana/G.svg" },
        { name: "All", image: "img/mana/C.svg" },
      ],
    };
  },
  computed: {
    numberOfPages() {
      let numberOfItems = 0;
      this.cards ? (numberOfItems = this.cards.length) : (numberOfItems = 0);
      return Math.ceil(numberOfItems / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Description");
    },
    ...mapGetters({
      user: "auth/user",
      cards: "cardInfo/cards",
    }),
  },
  methods: {
    colorFilter() {
      if (this.colorFilterSelect.name === "All") {
        this.filterCards = this.cards;
      } else {
        this.filterCards = this.cards.filter(
          (card) =>
            card.color.toLowerCase() ===
            this.colorFilterSelect.name.toLowerCase()
        );
      }
    },
    customSort(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] === "color") {
          const colorSort = [
            "white",
            "blue",
            "black",
            "red",
            "green",
            "azorius",
            "orzhov",
            "dimir",
            "izzet",
            "rakdos",
            "golgari",
            "grull",
            "boros",
            "selesnya",
            "simic",
            "colorless",
            "?",
          ];
          var indexA = colorSort.findIndex((x) => x == a.color.toLowerCase());
          var indexB = colorSort.findIndex((x) => x == b.color.toLowerCase());
          if (!isDesc[0]) {
            return indexA > indexB ? 1 : -1;
          } else {
            return indexB > indexA ? 1 : -1;
          }
        } else {
          if (!isDesc[0]) {
            return a[index[0]] > b[index[0]] ? 1 : -1;
          } else {
            return b[index[0]] > a[index[0]] ? 1 : -1;
          }
        }
      });
      return items;
    },
    getCardOverlay(card) {
      this.cardOverlay = true;
      this.currentCardId = card.id;
    },
    addCardToDeck(cardId) {
      this.$store.commit({
        type: "cardInfo/addCardToDeck",
        cardId: cardId,
      });
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    convertManaString(manaStr) {
      var manaConvert = {
        R: "<img src='img/mana/R.svg' width='14' height='14' />",
        W: "<img src='img/mana/W.svg' width='14' height='14' />",
        B: "<img src='img/mana/B.svg' width='14' height='14' />",
        U: "<img src='img/mana/U.svg' width='14' height='14' />",
        G: "<img src='img/mana/G.svg' width='14' height='14' />",
      };
      return manaStr.replace(/R|W|B|U|G/gi, function (matched) {
        return manaConvert[matched];
      });
    },
  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 0.9 !important;
  position: absolute;
  width: 100%;
}
.v-card--over {
  bottom: 0;
  opacity: 0.5 !important;
  position: absolute;
  width: 100%;
}
</style>