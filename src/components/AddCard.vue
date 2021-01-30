<template>
  <div class="home">
    <div class="flex flex-wrap w-full m-auto justify-center">
      <div v-for="(card, idx) in cards" :key="idx">
        <div class="text-2xl">{{ card }}</div>
      </div>
    </div>
    <v-container id="user-profile-view" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card icon="mdi-account-outline">
            <h1>Add a card</h1>
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field v-model="card.name" label="Card Name" />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field v-model="card.cost" label="Cost" />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="card.cmc"
                      label="CMC"
                      type="number"
                    />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="card.points"
                      label="Points"
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

                  <v-col cols="12">
                    <v-textarea
                      v-model="card.description"
                      label="Card description"
                    />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn color="primary" min-width="150" @click="addCard">
                      Submit
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async mounted() {
    this.$store.dispatch("cardInfo/getCardsData");
  },
  data: () => ({
    card: {
      name: "?",
      imgUrl: "logo.png",
      cost: 0,
      cmc: "0",
      color: "?",
      type: "?",
      points: 0,
      properties: [
        {
          rank: 1,
          damage: 0,
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
    color: null,
    type: null,
    colors: ["Blue", "Red", "Green", "Black", "White"],
    types: ["Creature", "Sorcery", "Enchantment"],
  }),
  methods: {
    async addCard(card) {
      try {
        await this.$store.dispatch("cardInfo/createCard", {
          file: "",
          cardData: this.card,
        });
        this.getCards();
      } catch (error) {
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
