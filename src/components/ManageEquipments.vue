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
            <h1>Submit equipment</h1>
            <v-alert type="success" v-if="sucessMsg">{{ sucessMsg }}</v-alert>
            <v-alert type="error" v-if="errorMsg">{{ errorMsg }}</v-alert>
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="9">
                    <v-text-field
                      v-model="equipment.name"
                      label="Equipment Name"
                    />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="equipment.slot"
                      :items="slot"
                      label="Slot"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="9">
                    <v-text-field
                      v-model="equipment.imgUrl"
                      label="Image URL"
                    />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="equipment.rarity"
                      :items="rarity"
                      label="Rarity"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="9">
                    <v-text-field
                      v-model="equipment.imgTmogUrl"
                      label="Transmog Image URL"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="equipment.description"
                      label="Equipment description"
                    />
                  </v-col>
                </v-row>
                <v-row v-for="(mod, index) in equipment.mods" :key="index">
                  <v-col cols="10">
                    <v-textarea
                      v-model="equipment.mods[index]"
                      label="Modifier"
                    />
                  </v-col>
                  <v-col cols="2">
                    <v-btn x-small text color="red" @click="removeMod(index)"
                      >Delete Mod</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row>
                  <v-btn text @click="addMod()">Add Mod</v-btn>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="primary"
                      min-width="150"
                      @click="submitEquipment"
                    >
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
            <v-card-subtitle>Preview of the current equipment:</v-card-subtitle>
            <Equipment
              :currentEquipmentInput="this.equipment"
              :key="this.equipment.id"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="3" v-if="this.lastEquipment.id">
          <v-card>
            <v-card-subtitle>Last Equipment added:</v-card-subtitle>
            <Equipment
              :currentEquipmentInput="this.lastEquipment"
              :key="this.lastEquipment.id"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "@/graphql/subscriptions";
import Equipment from "@/components/Equipment.vue";

export default {
  props: {
    currentEquipmentId: {
      type: String,
      required: false,
      default: null,
    },
  },
  components: {
    Equipment,
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
    if (this.$props.currentEquipmentId) {
      let getEquipmentData = await this.$store.dispatch(
        "cardInfo/getEquipment",
        this.$props.currentEquipmentId
      );
      this.equipment = getEquipmentData.data.getEquipment;
    } else {
      if (!(this.admin | this.mod)) {
        this.$router.push("/equipment");
      }
    }

    this.$store.dispatch("cardInfo/getEquipmentsData");
    // Subscribe to creation of Todo
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateEquipment)
    ).subscribe({
      next: ({ value }) => (this.lastEquipment = value.data.onCreateEquipment),
    });
  },
  data: () => ({
    loading: false,
    sucessMsg: "",
    errorMsg: "",
    lastEquipment: {
      name: "?",
      imgUrl: "logo.png",
      rarity: "?",
      slot: "?",
      description: "?",
      mods: ["?"],
    },
    artifacsDebug: false,
    equipment: {
      name: "?",
      imgUrl: "logo.png",
      rarity: "?",
      slot: "?",
      description: "?",
      mods: ["?"],
    },
    rarity: ["Mythic", "Rare", "Uncommon", "Common"],
    slot: ["Head", "Body", "Arms", "Feet", "Accessory"],
    userGroups: [],
    mod: false,
    admin: false,
  }),
  methods: {
    async submitEquipment(equipment) {
      try {
        this.loading = true;
        this.sucessMsg = "";
        this.errorMsg = "";

        this.equipment.updatedBy = this.user.username;
        this.equipment.updatedById = this.user.id;

        if (this.$props.currentEquipmentId) {
          if (this.admin | this.mod) {
            await this.$store.dispatch("cardInfo/updateEquipment", {
              file: "",
              equipmentData: this.equipment,
            });
            this.sucessMsg = "Equipment Updated";
          } else {
            await this.$store.dispatch("cardInfo/submitEquipment", {
              file: "",
              equipmentData: this.equipment,
            });
            this.sucessMsg =
              "Your update was submited for review. It will be visible after mod approval.";
          }
        } else {
          await this.$store.dispatch("cardInfo/createEquipment", {
            file: "",
            equipmentData: this.equipment,
          });
          this.sucessMsg = "Equipment Added";
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errorMsg = error.errors[0].message;
        console.log("error adding the equipment", error);
      }
    },

    addMod() {
      this.equipment.mods.push("");
    },
    removeMod(index) {
      this.equipment.mods.splice(index, 1);
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      equipments: "cardInfo/equipments",
    }),
  },
};
</script>
