<template>
  <v-container fluid>
    <v-data-iterator
      :items="items ? (filterItems.length > 0 ? filterItems : items) : []"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      :single-expand="true"
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

          <v-select
            class="pa-2 pt-10"
            v-model="typeFilterSelect"
            @input="typeFilter"
            :items="mtgSlot"
            label="Filter by slot"
            item-text="name"
          >
            <template v-slot:selection="{ item }">
              <img :src="item.image" width="14" height="14" />
              <v-spacer></v-spacer>
              {{ item.name }}
            </template>
            <template v-slot:item="slotProps">
              <img :src="slotProps.item.image" width="14" height="14" />
              <v-spacer></v-spacer>
              {{ slotProps.item.name }}
            </template>
          </v-select>

          <v-switch v-model="showInfo" label="Info"></v-switch>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items, isExpanded, expand }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <div
                class="font-weight-bold text-no-wrap secondary white--text"
                v-html="getItemHeader(item)"
              ></div>

              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card class="mx-auto">
                    <v-img
                      class="white--text align-top"
                      height="200px"
                      :src="item.imgUrl ? item.imgUrl : `logo.png`"
                    >
                      <v-list
                        v-if="showInfo | (isExpanded(item) & showDescription)"
                        dense
                        height="100%"
                        v-bind:style="{ opacity: 0.8 }"
                      >
                        <v-list-item class="mt-n4">
                          <v-list-item-content class="ml-n3">
                            <p><strong>Slot:</strong> {{ item["slot"] }}</p>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content class="ml-n3">
                            <p>
                              <strong>Description: </strong>
                              {{ item["description"] }}
                            </p>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-img>

                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#036358">
                        <v-row align-content="center">
                          <v-col>
                            <v-btn small @click="getItem(item)">
                              Preview
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              small
                              :to="{
                                name: 'Equipment',
                                query: { equipmentId: item.id },
                              }"
                              target="_blank"
                            >
                              Open
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              small
                              :to="{
                                name: 'ManageEquipments',
                                query: { equipmentId: item.id },
                              }"
                              target="_blank"
                            >
                              Edit
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>

              <v-card-actions>
                <v-btn
                  v-if="!showInfo"
                  text
                  color="teal accent-4"
                  @click="expand(item, true), (showDescription = true)"
                >
                  Description
                </v-btn>
              </v-card-actions>
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

    <v-overlay :value="previewOverlay">
      <v-icon large @click="previewOverlay = false">mdi-close-box</v-icon>
      <v-card class="overflow-y-auto" max-height="600">
        <Equipment
          :currentEquipmentInput="currentItem"
          :currentEquipmentId="currentItem.id"
        />
      </v-card>
    </v-overlay>

    <v-overlay :value="items ? false : true">
      <v-progress-circular
        indeterminate
        size="64"
        v-if="items ? false : true"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Equipment from "@/components/Equipment.vue";

export default {
  components: {
    Equipment,
  },
  async mounted() {
    this.$store.dispatch("cardInfo/getEquipmentsData");
  },
  data() {
    return {
      previewOverlay: false,
      allowEdit: false,
      showInfo: true,
      showDescription: false,
      filterItems: [],
      currentItem: {
        id: "?",
        name: "?",
        imgUrl: "logo.png",
        slot: "?",
        description: "?",
        mods: ["?"],
      },
      itemsPerPageArray: [1, 2, 4, 8, 12, 20, 30, 60, 100, 200, 400],
      search: "",
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: "name",
      deleteCheck: [],

      typeFilterSelect: "All",
      mtgSlot: [
        { name: "Head", image: "img/slot/head.svg" },
        { name: "Body", image: "img/slot/body.svg" },
        { name: "Arms", image: "img/slot/arms.svg" },
        { name: "Feet", image: "img/slot/feet.svg" },
        { name: "Accessory", image: "img/slot/accessory.svg" },
        { name: "All", image: "img/mana/C.svg" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      items: "cardInfo/equipments",
    }),
    numberOfPages() {
      let numberOfItems = 0;
      this.items ? (numberOfItems = this.items.length) : (numberOfItems = 0);
      return Math.ceil(numberOfItems / this.itemsPerPage);
    },
  },
  methods: {
    typeFilter() {
      if (this.typeFilterSelect === "All") {
        this.filterItems = this.items;
      } else {
        this.filterItems = this.items.filter(
          (item) =>
            item["slot"].toLowerCase() === this.typeFilterSelect.toLowerCase()
        );
      }
    },
    getItemHeader(item) {
      let headerHtml = item.name + "&nbsp;";
      let headerSlot = "";
      if (item["slot"] !== null) {
        let slot = item["slot"].toLowerCase();
        switch (slot) {
          case "head":
          case "body":
          case "arms":
          case "feet":
          case "accessory":
            headerSlot =
              "<img src='img/slot/" +
              slot +
              ".svg' alt='" +
              slot +
              "' title='" +
              slot +
              "' width='15' height='15' />";
            break;
          default:
            headerSlot =
              "<img src='img/slot/question-mark.svg' alt='" +
              slot +
              "' title='" +
              slot +
              "' width='15' height='15' />";
        }
      }
      return headerHtml.concat(headerSlot);
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

    setAllowEdit(value) {
      this.allowEdit = value;
    },
    getItem(item) {
      this.previewOverlay = true;
      this.currentItem = item;
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
</style>