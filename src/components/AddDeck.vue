<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="blue-grey lighten-1">
      <v-toolbar-title>
        <v-text-field
          class="mt-6"
          v-model="deck.name"
          label="Deck Name"
          placeholder="Deck Name"
          filled
          rounded
          dense
        ></v-text-field>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <span>Save Deck</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-if="deckEdit" v-bind="attrs" v-on="on" @click="addDeck()">
            mdi-content-save
          </v-icon>
        </template>
        <span>Save Deck</span>
      </v-tooltip>
    </v-toolbar>
    <v-alert v-if="errorMsg" type="error"> {{ errorMsg }} </v-alert>
    <v-alert v-if="successMsg" type="success"> {{ successMsg }} </v-alert>
    <v-list>
      <v-list-group
        v-for="card in myNewDeckCards"
        :key="card.id"
        v-model="card.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-img :src="card.imgUrl" height="50px">
              <v-container>
                <v-row>
                  <v-col cols="8" sm="6" md="8">
                    <v-card color="rgba(0, 0, 0, 0.3)">
                      {{ card.name }}
                    </v-card>
                  </v-col>
                  <v-col cols="2" md="2">
                    <v-card color="rgba(0, 0, 0, 0.3)">
                      <div
                        class="font-weight-bold"
                        v-html="convertManaString(card.cost)"
                      />
                    </v-card>
                  </v-col>
                  <v-col cols="2" md="2" class="text-end">
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          v-if="deckEdit"
                          color="red"
                          v-bind="attrs"
                          v-on="on"
                          @click="deleteCard(card.id)"
                        >
                          mdi-minus-circle
                        </v-icon>
                      </template>
                      <span>Remove Card</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
          </v-list-item-content>
        </template>

        <v-list-item-content class="v-text--bg">
          <v-img :src="card.imgUrl">
            <div class="v-text--bg">
              <v-list color="rgba(0, 0, 0, 0.3)">
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content>
                    {{ key }}:
                    {{ card[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-img>
        </v-list-item-content>
      </v-list-group>
    </v-list>
  </v-card>
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
      errorMsg: "",
      successMsg: "",
      myNewDeckCards: [],
      allCards: [],
      deck: {
        name: "",
        owner: "",
        ownerId: "",
        cards: [],
      },
      reveal: false,
      nocards: [],
      itemsPerPageArray: [6, 12, 18, 30, 60, 90, 180, 360],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 12,
      sortBy: "name",
      cardRank: "1",
      ranks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      keys: ["CMC", "Color", "Type", "Points", "Description"],
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
      return this.keys.filter((key) => key);
    },
    ...mapGetters({
      cards: "cardInfo/cards",
      newDeckCards: "cardInfo/newDeckCards",
      user: "auth/user",
    }),
  },
  watch: {
    cards(allCardsStore) {
      this.allCards = allCardsStore;
    },
    newDeckCards(cardIdList) {
      try {
        this.myNewDeckCards = [];
        for (var i = 0; i < this.allCards.length; i++) {
          var card = this.allCards[i];
          if (cardIdList.includes(card.id)) {
            this.myNewDeckCards.push(card);
          }
        }
        // add unique cards only
        this.deck.cards = [...new Set(cardIdList)];
      } catch (error) {
        console.log("error getting card list", error);
      }
    },
  },
  methods: {
    deleteCard(cardId) {
      this.$store.commit({
        type: "cardInfo/removeCardFromDeck",
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
    async addDeck() {
      try {
        if (!/\S/.test(this.deck.name)) {
          this.errorMsg = "Deck Name can't be empty";
          return -1;
        }
        if (this.deck.cards.length != 12) {
          this.errorMsg = "A Deck must contain 12 cards";
          return -1;
        }
        this.deck.owner = this.user.username;
        this.deck.ownerId = this.user.id;
        await this.$store.dispatch("cardInfo/createDeck", this.deck);
        this.errorMsg = "";
        this.successMsg = "Deck created!";
      } catch (error) {
        console.log("error adding the deck", error);
        this.errorMsg = error;
      }
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
.v-text--bg {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>