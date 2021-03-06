<template>
  <v-container fluid>
    <v-data-iterator
      :items="decks ? decks : nodecks"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy"
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
            lg="4"
          >
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card class="mx-auto">
                  <v-img :src="deckImgs[item.id]" max-height="50" width="100%">
                    <v-card-subtitle
                      ><div class="v-card--img">
                        {{ item.name }}
                      </div></v-card-subtitle
                    >

                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#036358">
                        <v-row
                          align-content="center"
                          v-show="!showDeleteCheck(item.id)"
                        >
                          <v-col>
                            <v-btn small @click="getDeck(item)">
                              Preview Deck
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              small
                              :to="{
                                name: 'Deck',
                                query: { deckId: item.id },
                              }"
                              target="_blank"
                            >
                              Open Deck
                            </v-btn>
                          </v-col>
                          <v-col v-if="userDecks">
                            <v-icon
                              color="red"
                              @click="confirmDeleteDeck(item.id)"
                            >
                              mdi-delete
                            </v-icon>
                          </v-col>
                        </v-row>
                        <v-row
                          align-content="center"
                          v-if="userDecks && showDeleteCheck(item.id)"
                        >
                          <v-col>
                            <v-btn
                              color="red"
                              small
                              @click="deleteDeck(item.id)"
                            >
                              Delete Deck
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn small @click="confirmDeleteDeck(item.id)">
                              Cancel
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-overlay>
                    </v-fade-transition>
                  </v-img>
                </v-card>
              </template>
            </v-hover>
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
  props: {
    userDecks: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    Deck,
  },
  async mounted() {
    if (this.$props.userDecks) {
      this.$store.dispatch("cardInfo/getUserDecksData");
    } else {
      this.$store.dispatch("cardInfo/getDecksData");
    }
    this.$store.dispatch("cardInfo/getCardsData");
  },
  data() {
    return {
      deckOverlay: false,
      allowEdit: false,
      currentDeck: { cards: [] },
      nodecks: [],
      deckImgs: {},
      itemsPerPageArray: [6, 12, 18, 30, 60, 90, 180],
      search: "",
      sortDesc: true,
      page: 1,
      itemsPerPage: 12,
      sortBy: "updatedAt",
      deleteCheck: [],
    };
  },
  computed: {
    numberOfPages() {
      let numberOfItems = 0;
      this.decks ? (numberOfItems = this.decks.length) : (numberOfItems = 0);
      return Math.ceil(numberOfItems / this.itemsPerPage);
    },
    ...mapGetters({
      user: "auth/user",
      decks: "cardInfo/decks",
      cards: "cardInfo/cards",
    }),
  },
  watch: {
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
    decks(allDecksStore) {
      if (!this.$props.userDecks) {
        // skip if we are not in user account
        return;
      }
      this.deleteCheck = [];
      allDecksStore.forEach((element) =>
        this.deleteCheck.push({ id: element.id, show: false })
      );
    },
  },
  methods: {
    showDeleteCheck(id) {
      if (this.deleteCheck.length === 0) {
        // skip if we are not in user account or if the cards aren't loaded yet
        return false;
      }
      let index = this.deleteCheck.findIndex((element) => element.id === id);
      return this.deleteCheck[index].show;
    },
    confirmDeleteDeck(id) {
      let index = this.deleteCheck.findIndex((element) => element.id === id);
      this.deleteCheck[index].show = !this.deleteCheck[index].show;
    },
    async deleteDeck(deckId) {
      try {
        console.log("delete deck id:", deckId);
        await this.$store.dispatch("cardInfo/deleteDeck", deckId);
        console.log("Deck Deleted!");
        let index = this.decks.findIndex((element) => element.id === deckId);
        if (index > -1) {
          this.decks.splice(index, 1);
        }
      } catch (error) {
        console.log("error deleting the deck", error);
      }
    },
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
  },
};
</script>

<style scoped>
.v-card--img {
  background: rgba(0, 0, 0, 0.5);
}
</style>