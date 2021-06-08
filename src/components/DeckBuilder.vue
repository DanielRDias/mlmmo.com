<template>
  <div>
    <v-overlay :value="loading ? true : false">
      <v-progress-circular
        indeterminate
        size="64"
        v-if="loading ? true : false"
      ></v-progress-circular>
    </v-overlay>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="4" lg="4">
        <v-flex class="elevation-1 pa-1">
          <v-toolbar>
            <v-toolbar-title>
              <v-text-field
                class="mt-6"
                v-model="deck.name"
                label="Deck Name"
                placeholder="Deck Name"
              ></v-text-field>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="addDeck()">
                  mdi-content-save
                </v-icon>
              </template>
              <span>Save Deck</span>
            </v-tooltip>
          </v-toolbar>
          <v-row>
            <v-col
              v-bind:style="{
                color:
                  deckCards.length > 12
                    ? 'red'
                    : deckCards.length === 12
                    ? 'lightgreen'
                    : 'lightblue',
              }"
            >
              <v-icon>mdi-cards</v-icon>
              {{ deckCards.length }}/12
            </v-col>

            <v-col
              v-bind:style="{
                color:
                  deckPoints > 12
                    ? 'red'
                    : deckPoints === 12
                    ? 'lightgreen'
                    : 'lightblue',
              }"
            >
              Creature Points:
              {{ deckPoints }}/12
            </v-col>
          </v-row>

          <v-alert v-if="errorMsg" type="error"> {{ errorMsg }} </v-alert>
          <v-alert v-if="successMsg" type="success"> {{ successMsg }} </v-alert>
          <v-list two-line>
            <template v-for="card in deckCards">
              <v-list-item :key="card.id">
                <v-tooltip open-delay="500" transition="none">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      <v-list-item-avatar>
                        <img :src="card.imgUrl" />
                      </v-list-item-avatar>
                    </span>
                  </template>
                  <span><Card :current-card-id="card.id" /></span>
                </v-tooltip>
                <v-list-item-content>
                  <v-list-item-title v-html="card.name"></v-list-item-title>
                  <v-list-item-subtitle
                    class="font-weight-bold"
                    v-html="convertManaString(card.cost)"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn @click="removeCard(card)">
                        <v-icon color="red" v-bind="attrs" v-on="on">
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Remove {{ card.name }} from the deck</span>
                  </v-tooltip>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-flex>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="8" lg="8">
        <v-flex class="elevation-1 pa-1">
          <v-data-iterator
            :items="
              cards ? (filterCards.length > 0 ? filterCards : cards) : nocards
            "
            :items-per-page.sync="itemsPerPage"
            :page="page"
            :search="search"
            :sortBy="sortBy.toLowerCase()"
            :sortDesc="sortDesc"
            hide-default-footer
            class="elevation-1"
            loading
            loading-text="Loading... Please wait"
          >
            <template v-slot:header>
              <v-toolbar class="mb-1">
                <v-menu
                  v-if="$vuetify.breakpoint.xs"
                  bottom
                  right
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </template>
                  <v-text-field
                    :autofocus="true"
                    v-model="search"
                    clearable
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Search"
                  ></v-text-field>
                </v-menu>
                <v-text-field
                  v-if="!$vuetify.breakpoint.xs"
                  :autofocus="true"
                  v-model="search"
                  clearable
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                ></v-text-field>

                <v-select
                  class="pa-2 pt-10"
                  v-model="colorFilterSelect"
                  @input="colorFilter"
                  :items="mtgcolors"
                  label="Filter cards by color"
                  item-text="name"
                >
                  <template v-slot:selection="{ item }">
                    <img :src="item.image" width="14" height="14" />
                    <v-spacer></v-spacer>
                    {{ item.name }}
                  </template>
                  <template v-slot:item="slotProps">
                    <img :src="slotProps.item.image" width="14" height="14" />
                    <v-spacer></v-spacer>
                    {{ slotProps.item.name }}
                  </template>
                </v-select>

                <v-select
                  v-model="sortBy"
                  flat
                  solo-inverted
                  hide-details
                  :items="keysSort"
                  prepend-inner-icon="mdi-sort"
                  label="Sort by"
                ></v-select>
                <v-btn-toggle v-model="sortDesc" mandatory>
                  <v-btn icon depressed :value="false">
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                  <v-btn icon depressed :value="true">
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-toolbar>
            </template>

            <template v-slot:default="{ items }">
              <v-list two-line>
                <v-subheader> CARD LIST </v-subheader>
                <template v-for="card in items">
                  <v-list-item :key="card.id">
                    <v-tooltip open-delay="500" transition="none">
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          <v-list-item-avatar>
                            <img :src="card.imgUrl" />
                          </v-list-item-avatar>
                        </span>
                      </template>
                      <span><Card :current-card-id="card.id" /></span>
                    </v-tooltip>
                    <v-list-item-content>
                      <v-list-item-title v-html="card.name"></v-list-item-title>
                      <v-list-item-subtitle
                        class="font-weight-bold"
                        v-html="convertManaString(card.cost)"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn @click="addCard(card)">
                            <v-icon color="green" v-bind="attrs" v-on="on">
                              mdi-plus-box
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>Add {{ card.name }} to the deck</span>
                      </v-tooltip>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-list>
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
        </v-flex>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "@/components/Card.vue";

export default {
  props: {
    currentDeckId: {
      type: String,
      required: false,
      default: null,
    },
  },
  components: {
    Card,
  },
  async beforeMount() {
    this.$store.dispatch("cardInfo/getCardsData");
    if (this.$props.currentDeckId) {
      let getDeckData = await this.$store.dispatch(
        "cardInfo/getDeck",
        this.$props.currentDeckId
      );
      this.deck = getDeckData.data.getDeck;
      getDeckData.data.getDeck.cards.forEach(async (cardId) => {
        let getCardData = await this.$store.dispatch(
          "cardInfo/getCard",
          cardId
        );
        this.deckCards.push(getCardData.data.getCard);
      });
    }
  },
  async mounted() {},
  data() {
    return {
      loading: false,
      errorMsg: "",
      successMsg: "",
      deck: {
        name: "",
        owner: "anonymous",
        ownerId: "anonymous",
        cards: [],
      },
      deckCards: [],
      allCards: [],
      nocards: [],

      filterCards: [],
      search: "",
      page: 1,
      itemsPerPage: 12,
      itemsPerPageArray: [1, 2, 4, 8, 12, 20, 30, 60, 100, 200, 400],
      sortDesc: false,
      keysSort: ["Name", "CMC", "Color", "Type", "Points"],
      sortBy: "color",
      colorFilterSelect: "All",
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
    ...mapGetters({
      cards: "cardInfo/cards",
      user: "auth/user",
    }),
    numberOfPages() {
      let numberOfItems = 0;
      this.cards ? (numberOfItems = this.cards.length) : (numberOfItems = 0);
      return Math.ceil(numberOfItems / this.itemsPerPage);
    },
    deckPoints() {
      let points = 0;
      this.deckCards.forEach((card) => {
        if (parseInt(card.points)) {
          points += parseInt(card.points);
        }
      });
      return points;
    },
  },
  watch: {
    cards() {
      this.allCards = this.cards;
    },
  },
  methods: {
    colorFilter() {
      if (this.colorFilterSelect === "All") {
        this.filterCards = this.cards;
      } else {
        this.filterCards = this.cards.filter(
          (card) =>
            card.color.toLowerCase() === this.colorFilterSelect.toLowerCase()
        );
      }
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
    cardInDeck(id) {
      if (this.deckCards.some((e) => e.id === id)) {
        return true;
      } else {
        return false;
      }
    },
    addCard(card) {
      if (!this.cardInDeck(card.id)) {
        this.deckCards.push(card);
        this.deck.cards.push(card.id);
      }
    },
    removeCard(card) {
      this.deckCards = this.deckCards.filter(function (obj) {
        return obj.id !== card.id;
      });
      this.deck.cards = this.deck.cards.filter(function (obj) {
        return obj !== card.id;
      });
    },
    async addDeck() {
      try {
        this.loading = true;
        var result;
        var deckId;
        if (!/\S/.test(this.deck.name)) {
          this.errorMsg = "Deck Name can't be empty";
          this.loading = false;
          return -1;
        }
        if (this.deck.cards.length != 12) {
          this.errorMsg = "A Deck must contain 12 cards";
          this.loading = false;
          return -1;
        }
        if (this.deckPoints > 12) {
          this.errorMsg = "A Deck can't have more than 12 creature points";
          this.loading = false;
          return -1;
        }

        if (this.deck.id) {
          result = await this.$store.dispatch("cardInfo/updateDeck", this.deck);
          deckId = result.data.updateDeck.id;
        } else {
          if (this.user) {
            this.deck.owner = this.user.username;
            this.deck.ownerId = this.user.id;
            result = await this.$store.dispatch(
              "cardInfo/createDeck",
              this.deck
            );
            deckId = result.data.createDeck.id;
          } else {
            console.log("create anonymous user deck");
            result = await this.$store.dispatch(
              "cardInfo/createAnonymousDeck",
              this.deck
            );
          }
        }
        this.errorMsg = "";
        this.$router.push("/deck?deckId=" + deckId);
        this.loading = false;
      } catch (error) {
        console.log("error adding the deck", error);
        this.errorMsg = error;
        this.loading = false;
      }
      this.loading = false;
    },
  },
};
</script>
