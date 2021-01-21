<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
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

          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-spacer></v-spacer>
              <v-select
                v-model="cardRank"
                flat
                solo-inverted
                hide-details
                :items="ranks"
                prepend-inner-icon="mdi-arrow-up-bold-circle-outline"
                label="Card Rank"
              ></v-select>
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-sort"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-list>
          </v-menu>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-img
                class="white--text align-end"
                height="200px"
                :src="item.img"
              >
                <v-card-title class="subheading font-weight-bold">
                  {{ item.name }}
                </v-card-title>
              </v-img>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(property, index) in item.properties[
                    parseInt(cardRank) - 1
                  ]"
                  :key="index"
                >
                  <v-list-item-content> {{ index }}: </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ property }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
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
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn fab class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      cardRank: "1",
      keys: ["Name", "Cost", "CMC", "Color", "Type", "Points", "Description"],
      ranks: [1, 2, 3],
      properties: {
        Creature: ["Damage", "HP", "Speed", "Role"],
        Sorcery: ["Damage", "Duration", "Range", "Area"],
        Enchantment: ["Effect", "Duration"],
      },
      items: [
        {
          name: "Sporecap Spider",
          img:
            "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/b/abb1d18f-7a94-4a2f-a60c-0af852d44501.jpg",
          cost: "2G",
          cmc: 3,
          color: "Green",
          type: "Creature",
          points: 2,
          properties: [
            { Damage: 66, HP: 1100, Speed: "Medium", Role: "Melee" },
            { Damage: 99, HP: 1400, Speed: "Medium", Role: "Melee" },
            { Damage: 132, HP: 1600, Speed: "Medium", Role: "Melee" },
          ],
          description:
            "Special Ability: Fires a projectile that deals 200% of its damage over 3 seconds to the target and applying Stun to the duration",
          other: {
            creatureType: "Spider",
            stun: "3s",
          },
        },
        {
          name: "Academy Wizard",
          img:
            "https://media.magic.wizards.com/images/hero/aFTYou5enU_icon.jpg",
          cost: "3U",
          cmc: 4,
          color: "Blue",
          type: "Creature",
          points: 3,
          properties: [
            { Damage: 99, HP: 550, Speed: "Medium", Role: "Ranged" },
            { Damage: 132, HP: 700, Speed: "Medium", Role: "Ranged" },
            { Damage: 163, HP: 850, Speed: "Medium", Role: "Ranged" },
          ],
          description:
            "Whenever you draw one ore more spells, Academy Wizard summons a 1/1 ranged Illusion (up to a maximum of 3)",
          other: {
            creatureType: "Illusion",
          },
        },
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
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