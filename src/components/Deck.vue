<template>
  <v-card class="mx-auto">
    <v-speed-dial
      v-model="dialShare"
      absolute
      left
      top
      direction="right"
      open-on-hover
    >
      <template v-slot:activator>
        <v-btn fab top right small color="primary">
          <v-icon v-if="dialShare">mdi-close</v-icon>
          <v-icon v-else>mdi-share-variant</v-icon>
        </v-btn>
      </template>
      <ShareNetwork
        network="Facebook"
        :url="shareInfo.url"
        :title="shareInfo.title"
        :description="shareInfo.description"
        :quote="shareInfo.quote"
        :hashtags="shareInfo.hashtags"
      >
        <v-btn style="text-decoration: none" dark fab bottom color="blue" small>
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
      </ShareNetwork>
      <ShareNetwork
        network="Twitter"
        :url="shareInfo.url"
        :title="shareInfo.title"
        :description="shareInfo.description"
        :hashtags="shareInfo.hashtags"
        :twitter-user="shareInfo.twitteruser"
      >
        <v-btn dark fab bottom color="blue" small>
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
      </ShareNetwork>
      <ShareNetwork
        network="Reddit"
        :url="shareInfo.url"
        :title="shareInfo.title"
        :description="shareInfo.description"
        :hashtags="shareInfo.hashtags"
      >
        <v-btn dark fab bottom color="red" small>
          <v-icon>mdi-reddit</v-icon>
        </v-btn>
      </ShareNetwork>
      <ShareNetwork
        network="WhatsApp"
        :url="shareInfo.url"
        :title="shareInfo.title"
        :description="shareInfo.description"
        :hashtags="shareInfo.hashtags"
      >
        <v-btn dark fab bottom color="green" small>
          <v-icon>mdi-whatsapp</v-icon>
        </v-btn>
      </ShareNetwork>
      <ShareNetwork
        network="Email"
        :url="shareInfo.url"
        :title="shareInfo.title"
        :description="shareInfo.description"
        :hashtags="shareInfo.hashtags"
      >
        <v-btn dark fab bottom small>
          <v-icon>mdi-email</v-icon>
        </v-btn>
      </ShareNetwork>
      <v-btn dark fab bottom small @click="copyText()">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-card-title class="justify-center">{{ this.deck.name }}</v-card-title>
    <v-card-subtitle class="text-center">
      Created by {{ this.deck.owner }}
    </v-card-subtitle>
    <v-row class="ml-2 mr-2">
      <v-col
        cols="3"
        xs="3"
        sm="2"
        md="2"
        lg="1"
        xl="1"
        v-for="card in deckCards"
        :key="card.id"
        v-model="card.active"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-img :src="card.imgUrl" max-width="100%" max-height="100%" />
              <div
                class="font-weight-bold"
                v-html="convertManaString(card.cost)"
              />
            </span>
          </template>
          <span><Card :current-card-id="card.id" /></span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  props: {
    deckId: {
      type: String,
      required: true,
    },
  },
  components: {
    Card,
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
      dialShare: false,
      shareInfo: {
        url: "https://www.mlarpg.com/deck?deckId=" + this.$props.deckId,
        title: "Checkout this deck",
        description: "Created using MLaRPG Deck Builder",
        hashtags: "MLaRPG,MagicLegends,ML",
        quote: "Checkout this deck, created using MLaRPG Deck Builder",
        twitteruser: "MLaRPG",
      },
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
    copyText() {
      let textToCopy =
        this.shareInfo.title +
        ": " +
        this.shareInfo.url +
        " " +
        this.shareInfo.description;
      navigator.clipboard.writeText(textToCopy);
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

<style scoped>
a:link {
  text-decoration: none;
}
</style>