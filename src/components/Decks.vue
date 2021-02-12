<template>
  <v-container fluid>
    <v-data-iterator
      :items="decks ? decks : nodecks"
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
            <v-list> </v-list>
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
            lg="4"
          >
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card class="mx-auto">
                  <v-card-subtitle>{{ item.name }}</v-card-subtitle>

                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <v-row align-content="center">
                        <v-col>
                          <v-btn @click="getDeck(item)">Preview Deck</v-btn>
                        </v-col>
                        <v-col>
                          <v-btn
                            :to="{
                              name: 'Deck',
                              query: { deckId: item.id },
                            }"
                            target="_blank"
                            >Open Deck</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </template>
            </v-hover>
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

    <v-overlay :value="deckOverlay">
      <v-icon large @click="deckOverlay = false">mdi-close-box</v-icon>
      <v-card class="overflow-y-auto" max-height="600">
        <Deck :deck-id="currentDeck.id" />
      </v-card>
    </v-overlay>

    <v-overlay :value="decks ? false : true">
      <v-progress-circular
        indeterminate
        size="64"
        v-if="decks ? false : true"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Deck from "@/components/Deck.vue";

export default {
  components: {
    Deck,
  },
  async mounted() {
    this.$store.dispatch("cardInfo/getDecksData");
    this.$store.dispatch("cardInfo/getCardsData");
  },
  data() {
    return {
      testload: false,
      deckOverlay: false,
      allowEdit: false,
      currentDeck: { cards: [] },
      nodecks: [],
      allCards: [],
      itemsPerPageArray: [6, 12, 18, 30, 60, 90, 180, 360],
      search: "",
      sortDesc: false,
      page: 1,
      itemsPerPage: 12,
      sortBy: "name",
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      decks: "cardInfo/decks",
      cards: "cardInfo/cards",
    }),
  },
  watch: {
    cards(allCardsStore) {
      this.allCards = allCardsStore;
    },
  },
  methods: {
    setAllowEdit(value) {
      this.allowEdit = value;
    },
    getDeck(deck) {
      this.deckOverlay = true;
      this.currentDeck.id = deck.id;
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
