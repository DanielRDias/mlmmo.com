<template>
  <v-container fluid>
    <v-data-iterator
      :items="cards ? cards : nocards"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
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
              <v-spacer></v-spacer>
              <v-select
                v-model="cardRank"
                flat
                solo-inverted
                hide-details
                :items="ranks"
                prepend-inner-icon="mdi-arrow-up-bold-circle-outline"
                label="Card Rank"
              ></v-select>
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
            :key="item.name"
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
          <span class="grey--text">Items</span>
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
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    deckEdit: { type: Boolean, required: false, default: false },
  },
  async mounted() {
    this.$store.dispatch("cardInfo/getCardsData");
  },
  data() {
    return {
      reveal: false,
      nocards: [],
      itemsPerPageArray: [6, 12, 18, 30, 60, 90, 180, 360],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 30,
      sortBy: "name",
      cardRank: "1",
      keys: ["Name", "Cost", "CMC", "Color", "Type", "Points", "Description"],
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
    };
  },
  computed: {
    filteredKeys() {
      return this.keys.filter((key) => key !== "Description");
    },
    ...mapGetters({
      user: "auth/user",
      cards: "cardInfo/cards",
    }),
  },
  methods: {
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