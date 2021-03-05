<template>
  <v-card class="mx-auto pa-1" max-width="350">
    <v-row class="pa-1">
      <v-col cols="9">
        <h2>{{ this.currentCard.name }}</h2>
      </v-col>
      <v-col>
        <h3 v-html="convertManaString(this.currentCard.cost)"></h3>
      </v-col>
    </v-row>
    <v-img
      :src="this.currentCard.imgUrl"
      :alt="this.currentCard.name"
      height="300"
    >
      <div
        v-if="
          (this.currentCard.type.toLowerCase() === 'creature') &
          (typeof this.currentCard.power !== 'undefined') &
          (typeof this.currentCard.toughness !== 'undefined')
        "
        class="text-right"
      >
        <v-btn text elevation="6" class="creatureStats">
          {{ this.currentCard.power }}/{{ this.currentCard.toughness }}
        </v-btn>
      </div>
    </v-img>
    <v-row>
      <v-col align-self="center" class="text-right text-caption" cols="2">
        Rank:
      </v-col>
      <v-col>
        <v-slider
          v-model="cardRank"
          :max="9"
          :tick-labels="labels"
          class="mx-1"
          ticks
        ></v-slider>
      </v-col>
    </v-row>
    <v-list class="mt-n3 mb-n3">
      <v-row>
        <v-col
          cols="6"
          v-for="(value, name, index) in currentCard.properties[cardRank]"
          :key="index"
        >
          <v-list-item dense class="mt-n3 mb-n3">
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-subtitle class="text-right">
              {{ value }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-col>
      </v-row>
    </v-list>

    <v-card-text class="mt-n3 mb-n3"
      ><strong>Description:</strong> {{ this.currentCard.description }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    currentCardInput: {
      type: Object,
      required: false,
      default: null,
    },
    currentCardId: {
      type: String,
      required: false,
      default: null,
    },
  },
  async mounted() {
    if (this.$props.currentCardInput !== null) {
      this.currentCard = this.$props.currentCardInput;
    } else if (this.$props.currentCardId !== null) {
      this.getCardData = await this.$store.dispatch(
        "cardInfo/getCard",
        this.$props.currentCardId
      );
      this.currentCard = this.getCardData.data.getCard;
    }
  },
  methods: {
    convertManaString(manaStr) {
      var manaConvert = {
        R: "<img src='img/mana/R.svg' width='16' height='16' />",
        W: "<img src='img/mana/W.svg' width='16' height='16' />",
        B: "<img src='img/mana/B.svg' width='16' height='16' />",
        U: "<img src='img/mana/U.svg' width='16' height='16' />",
        G: "<img src='img/mana/G.svg' width='16' height='16' />",
      };
      return manaStr.replace(/R|W|B|U|G/gi, function (matched) {
        return manaConvert[matched];
      });
    },
  },
  data() {
    return {
      currentCard: {
        name: "?",
        imgUrl: "logo.png",
        cost: "0",
        cmc: 0,
        color: "?",
        type: "?",
        points: 0,
        properties: [
          {
            rank: 1,
          },
          {
            rank: 2,
          },
          {
            rank: 3,
          },
          {
            rank: 4,
          },
          {
            rank: 5,
          },
          {
            rank: 6,
          },
          {
            rank: 7,
          },
          {
            rank: 8,
          },
          {
            rank: 9,
          },
          {
            rank: 10,
          },
        ],
        description: "?",
      },
      cardRank: 9,
      getCardData: null,
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      rank: 0,
    };
  },
};
</script>

<style scoped>
.creatureStats {
  background: #1e1e1e;
  color: white;
  margin-top: 2px;
  margin-right: 2px;
}
</style>