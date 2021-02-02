<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="blue-grey lighten-1">
      <v-toolbar-title>
        <v-text-field v-model="deck.name" label="Deck Name" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <span>Save Deck</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-if="allowEdit"
            v-bind="attrs"
            v-on="on"
            @click="addDeck(deck)"
          >
            mdi-content-save
          </v-icon>
        </template>
        <span>Save Deck</span>
      </v-tooltip>
    </v-toolbar>

    <v-list>
      <v-list-group
        v-for="card in deck.cards"
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
                          v-if="allowEdit"
                          color="red"
                          v-bind="attrs"
                          v-on="on"
                          @click="deleteCard(deck, card)"
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
  async mounted() {
    this.$store.dispatch("cardInfo/getCardsData");
  },
  data() {
    return {
      allowEdit: false,
      deck: {
        cards: [
          {
            id: "e84e1153-0c84-4c3a-89b1-a1eb2520a5c1",
            name: "7",
            createdAt: "2021-01-29T16:09:11.900Z",
            updatedAt: "2021-01-29T16:09:11.900Z",
            imgUrl: "https://www.mtgpics.com/pics/art/khm/024.jpg",
            cost: "3W",
            cmc: 0,
            color: "?",
            type: "?",
            points: 0,
            description: "?",
            version: null,
          },
          {
            id: "c4a89c9e-6f04-4759-a311-f4c9cb1c66a6",
            name: "test1",
            createdAt: "2021-01-27T20:45:29.351Z",
            updatedAt: "2021-01-27T20:45:29.351Z",
            imgUrl: "https://www.mtgpics.com/pics/art/khm/021.jpg",
            cost: "2U",
            cmc: 0,
            color: "?",
            type: "?",
            points: 0,
            description: "?",
            version: null,
          },
          {
            id: "aac31b2e-7adc-401e-b3b9-11a8be05bdf1",
            name: "12",
            createdAt: "2021-01-29T16:09:28.770Z",
            updatedAt: "2021-01-29T16:09:28.770Z",
            imgUrl: "https://www.mtgpics.com/pics/art/khm/031.jpg",
            cost: "GG",
            cmc: 0,
            color: "?",
            type: "?",
            points: 0,
            description: "?",
            version: null,
          },
          {
            id: "14301a7e-6c5b-4ef8-9e5a-07d5c628889f",
            name: "10",
            createdAt: "2021-01-29T16:09:21.772Z",
            updatedAt: "2021-01-29T16:09:21.772Z",
            imgUrl: "https://www.mtgpics.com/pics/art/khm/015.jpg",
            cost: "1WW",
            cmc: 0,
            color: "?",
            type: "?",
            points: 0,
            description: "?",
            version: null,
          },
          {
            id: "999be9e7-639a-4f8f-86aa-249f030950a6",
            name: "8",
            createdAt: "2021-01-29T16:09:15.190Z",
            updatedAt: "2021-01-29T16:09:15.190Z",
            imgUrl: "https://www.mtgpics.com/pics/art/khm/019.jpg",
            cost: "1G",
            cmc: 0,
            color: "?",
            type: "?",
            points: 0,
            description: "?",
            version: null,
          },
          {
            id: "eeced20f-eccb-4a56-b942-b1696a64902a",
            name: "test2",
            createdAt: "2021-01-27T21:06:09.032Z",
            updatedAt: "2021-01-27T21:06:09.032Z",
            imgUrl:
              "https://cdn1.dotesports.com/wp-content/uploads/2019/11/26170548/embercleave-1024x545.jpg",
            cost: "1U",
            cmc: 0,
            color: "?",
            type: "?",
            points: 0,
            description: "?",
            version: null,
          },
          {
            id: "ed6c5189-20ec-42fc-bc46-d3e0ec5ab5f4",
            name: "6",
            createdAt: "2021-01-29T16:09:07.823Z",
            updatedAt: "2021-01-29T16:09:07.823Z",
            imgUrl: "https://www.mtgpics.com/pics/art/khm/027.jpg",
            cost: "RR",
            cmc: 0,
            color: "?",
            type: "?",
            points: 0,
            description: "?",
            version: null,
          },
          {
            id: "875142a7-4756-41ac-a184-e676b85d3cee",
            name: "Enbercleave",
            createdAt: "2021-01-27T19:37:16.345Z",
            updatedAt: "2021-01-27T19:37:16.345Z",
            imgUrl: "https://www.mtgpics.com/pics/art/khm/033.jpg",
            cost: "4RR",
            cmc: 6,
            color: "Red",
            type: "Enchantment",
            points: 10,
            description:
              "Flash This spell costs 1 less to cast for each attacking creature you control. When Embercleave enters the battlefield, attach it to target creature you control. Equipped creature gets +1/+1 and has double strike and trample. Equip ",
            version: null,
          },
          {
            id: "184c30c7-cd07-4f59-8ed4-096892160534",
            name: "15",
            createdAt: "2021-01-29T16:09:38.514Z",
            updatedAt: "2021-01-29T16:09:38.514Z",
            imgUrl: "https://www.mtgpics.com/pics/art/khm/016.jpg",
            cost: "BB",
            cmc: 0,
            color: "?",
            type: "?",
            points: 0,
            description: "?",
            version: null,
          },
          {
            id: "e0b75eb6-b724-4be5-aa06-d6ae9014e721",
            name: "test3",
            createdAt: "2021-01-27T21:06:47.908Z",
            updatedAt: "2021-01-27T21:06:47.908Z",
            imgUrl: "https://www.mtgpics.com/pics/art/khm/022.jpg",
            cost: "5G",
            cmc: 0,
            color: "?",
            type: "?",
            points: 0,
            description: "?",
            version: null,
          },
        ],
        name: "Living Test Deck 1",
        owner: "living",
        ownerId: "b3eafe86-c2e7-4db2-aa85-0d5c1907fadc",
      },
      deck1: {
        name: "Living Test Deck 1",
        owner: "living",
        ownerId: "b3eafe86-c2e7-4db2-aa85-0d5c1907fadc",
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
      user: "auth/user",
      cards: "cardInfo/cards",
    }),
  },
  methods: {
    deleteCard(deck, card) {
      let index = deck.cards.indexOf(card);
      deck.cards.splice(index, 1);
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
    async addDeck(deck) {
      try {
        await this.$store.dispatch("cardInfo/createDeck", deck);
      } catch (error) {
        console.log("error adding the deck", error);
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