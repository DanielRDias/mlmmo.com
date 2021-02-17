<template>
  <v-card class="mx-auto" max-width="350">
    <v-card-title>{{ this.deck.name }}</v-card-title>
    <v-card-subtitle>Created by {{ this.deck.owner }}</v-card-subtitle>
    <v-list>
      <v-list-group
        v-for="card in deckCards"
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
                </v-row>
              </v-container>
            </v-img>
          </v-list-item-content>
        </template>
        <v-list-item-content class="v-text--bg">
          <v-img :src="card.imgUrl">
            <div class="v-text--bg">
              <v-list color="rgba(0, 0, 0, 0.3)">
                <v-list-item v-for="(key, index) in keys" :key="index">
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
export default {
  props: {
    deckId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      keys: ["CMC", "Color", "Type", "Points", "Description"],
      deckCards: [],
      deckData: null,
      deck: {
        name: "?",
        owner: "anonymous",
        ownerId: "anonymous",
        cards: [],
      },
      reveal: false,
    };
  },
  computed: {
    cards() {
      return this.deck.cards;
    },
  },
  watch: {
    async cards() {
      var getCardData = await this.$store.dispatch(
        "cardInfo/getCardList",
        this.deck.cards
      );
      this.deckCards = getCardData;
    },
  },
  async mounted() {
    try {
      this.deckData = await this.$store.dispatch(
        "cardInfo/getDeck",
        this.$props.deckId
      );
      this.deck = this.deckData.data.getDeck;
    } catch (error) {
      console.error("Error getting the deck id:", this.$props.deckId);
      console.error("Error: ", error);
    }
  },
  methods: {
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
