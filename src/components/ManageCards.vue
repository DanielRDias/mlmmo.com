<template>
  <div class="home">
    <v-overlay :value="loading ? true : false">
      <v-progress-circular
        indeterminate
        size="64"
        v-if="loading ? true : false"
      ></v-progress-circular>
    </v-overlay>
    <v-container id="user-profile-view" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="5">
          <v-card icon="mdi-account-outline">
            <h1>Submit Card</h1>
            <v-alert type="success" v-if="sucessMsg">{{ sucessMsg }}</v-alert>
            <v-alert type="error" v-if="errorMsg">{{ errorMsg }}</v-alert>

            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="7">
                    <v-text-field v-model="card.name" label="Card Name" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field v-model="card.cost" label="Cost" />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="card.cmc"
                      label="CMC"
                      type="number"
                    />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="card.color"
                      :items="colors"
                      label="Color"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="card.type"
                      :items="types"
                      label="Type"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="card.points"
                      label="Points"
                      type="number"
                    />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field v-model="card.power" label="Power" />
                  </v-col>

                  <v-col cols="12" md="9">
                    <v-text-field v-model="card.imgUrl" label="Image URL" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="card.rarity"
                      :items="rarity"
                      label="Rarity"
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-slider
                      v-model="cardRank"
                      :max="9"
                      :tick-labels="labels"
                      class="mx-1"
                      ticks
                    ></v-slider>
                  </v-col>
                  <v-col
                    cols="12"
                    md="2"
                    v-for="(value, name, index) in card.properties[cardRank]"
                    :key="index"
                  >
                    <v-text-field
                      v-model="card.properties[cardRank][name]"
                      :label="name"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="card.description"
                      label="Card description"
                    />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn color="primary" min-width="150" @click="submitCard">
                      Submit
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-subtitle>Preview of the current Card:</v-card-subtitle>
            <Card :currentCardInput="this.card" :key="this.card.id" />
          </v-card>
        </v-col>
        <v-col cols="12" md="3" v-if="this.lastCard.id">
          <v-card>
            <v-card-subtitle>Last Card added:</v-card-subtitle>
            <Card :currentCardInput="this.lastCard" :key="this.lastCard.id" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "@/graphql/subscriptions";
import Card from "@/components/Card.vue";

export default {
  props: {
    currentCardId: {
      type: String,
      required: false,
      default: null,
    },
  },
  components: {
    Card,
  },
  async mounted() {
    this.userGroups = await this.$store.dispatch("auth/userGroups");

    if (this.userGroups.includes("Admins")) {
      this.mod = true;
      this.admin = true;
    } else if (this.userGroups.includes("Moderators")) {
      this.mod = true;
      this.admin = false;
    } else {
      this.mod = false;
      this.admin = false;
    }
    if (this.$props.currentCardId) {
      let getCardData = await this.$store.dispatch(
        "cardInfo/getCard",
        this.$props.currentCardId
      );
      this.card = getCardData.data.getCard;
    } else {
      if (!(this.admin | this.mod)) {
        this.$router.push("/cards");
      }
    }

    this.$store.dispatch("cardInfo/getCardsData");
    // Subscribe to creation of Todo
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateCard)
    ).subscribe({
      next: ({ value }) => (this.lastCard = value.data.onCreateCard),
    });
  },
  data: () => ({
    loading: false,
    sucessMsg: "",
    errorMsg: "",
    lastCard: {
      name: "?",
      imgUrl: "logo.png",
      cost: "XWUBRG",
      cmc: 0,
      color: "?",
      type: "?",
      points: null,
      power: "0/0",
      rarity: null,
      properties: [
        {
          rank: 1,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 2,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 3,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 4,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 5,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 6,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 7,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 8,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 9,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 10,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
      ],
      description: "?",
    },
    card: {
      name: "?",
      imgUrl: "logo.png",
      cost: "XWUBRG",
      cmc: 0,
      color: "?",
      type: "?",
      points: null,
      power: "0/0",
      rarity: null,
      properties: [
        {
          rank: 1,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 2,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 3,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 4,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 5,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 6,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 7,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 8,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 9,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
        {
          rank: 10,
          damage: 0,
          healing: 0,
          health: 0,
          dps: "?",
          role: "?",
          duration: "?",
          range: 0,
          area: "?",
        },
      ],
      description: "?",
    },
    colors: [
      "white",
      "blue",
      "black",
      "red",
      "green",
      "azorius",
      "orzhov",
      "dimir",
      "izzet",
      "rakdos",
      "golgari",
      "grull",
      "boros",
      "selesnya",
      "simic",
      "colorless",
      "?",
    ],
    types: ["Creature", "Sorcery", "Enchantment"],
    rarity: ["common", "uncommon", "rare", "mythic"],
    cardRank: 9,
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],

    userGroups: [],
    mod: false,
    admin: false,
  }),
  methods: {
    async submitCard() {
      try {
        this.loading = true;
        this.sucessMsg = "";
        this.errorMsg = "";

        this.card.updatedBy = this.user.username;
        this.card.updatedById = this.user.id;

        if (this.$props.currentCardId) {
          if (this.admin | this.mod) {
            await this.$store.dispatch("cardInfo/updateCard", {
              file: "",
              cardData: this.card,
            });
            this.sucessMsg = "Card Updated";
          } else {
            await this.$store.dispatch("cardInfo/submitCard", {
              file: "",
              cardData: this.card,
            });
            this.sucessMsg =
              "Your update was submited for review. It will be visible after mod approval.";
          }
        } else {
          await this.$store.dispatch("cardInfo/createCard", {
            file: "",
            cardData: this.card,
          });
          this.sucessMsg = "Card Added";
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errorMsg = error.errors[0].message;
        console.log("error adding the card", error);
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      cards: "cardInfo/cards",
    }),
  },
};
</script>
