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
          <v-col v-for="item in props.items" :key="item.id" cols="12">
            <v-row v-if="userDecks">
              <v-col cols="10">
                <Deck :deck-id="item.id" />
              </v-col>
              <v-col cols="1" v-show="!showDeleteCheck(item.id)">
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn>
                      <v-icon
                        color="red"
                        @click="confirmDeleteDeck(item.id)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Delete Deck</span>
                </v-tooltip>
                <br />
                <br />
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :to="{
                        name: 'DeckBuilder',
                        query: { deckId: item.id },
                      }"
                    >
                      <v-icon color="blue" v-bind="attrs" v-on="on">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Edit Deck</span>
                </v-tooltip>
              </v-col>
              <v-col cols="2" v-show="userDecks && showDeleteCheck(item.id)">
                <v-row align-content="center">
                  <v-col>
                    <v-col>
                      <v-btn small @click="confirmDeleteDeck(item.id)">
                        Cancel
                      </v-btn>
                    </v-col>
                    <v-btn color="red" small @click="deleteDeck(item.id)">
                      Delete Deck
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <Deck :deck-id="item.id" v-else />
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
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    Deck,
  },
  async beforeMount() {
    // Wait for cards to be loaded to avoid deck component to load the cards again
    await this.$store.dispatch("cardInfo/getCardsData");

    if (this.$props.userDecks) {
      this.$store.dispatch("cardInfo/getUserDecksData");
    } else {
      this.$store.dispatch("cardInfo/getDecksData");
    }
  },
  data() {
    return {
      loading: true,
      deckOverlay: false,
      allowEdit: false,
      nodecks: [],
      deckImgs: {},
      itemsPerPageArray: [1, 3, 6, 12, 18, 30, 60, 90, 180],
      search: "",
      sortDesc: true,
      page: 1,
      itemsPerPage: 3,
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
      // load cards to cache it and reduce the deck component API calls
      cards: "cardInfo/cards",
    }),
  },
  watch: {
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