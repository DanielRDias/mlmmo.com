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
            <h1>Submit artifact</h1>
            <v-alert type="success" v-if="sucessMsg">{{ sucessMsg }}</v-alert>
            <v-alert type="error" v-if="errorMsg">{{ errorMsg }}</v-alert>
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="9">
                    <v-text-field
                      v-model="artifact.name"
                      label="Artifact Name"
                    />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="artifact.tier"
                      :items="tier"
                      label="Tier"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="9">
                    <v-text-field v-model="artifact.imgUrl" label="Image URL" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="artifact.rarity"
                      :items="rarity"
                      label="Rarity"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="artifact.description"
                      label="Artifact description"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="artifact.bonusR10"
                      label="Unlocks at rank 10"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="artifact.bonusR20"
                      label="Unlocks at rank 20"
                    />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="primary"
                      min-width="150"
                      @click="submitArtifact"
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
            <v-card-subtitle>Preview of the current artifact:</v-card-subtitle>
            <Artifact
              :currentArtifactInput="this.artifact"
              :key="this.artifact.id"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="3" v-if="this.lastArtifact.id">
          <v-card>
            <v-card-subtitle>Last Artifact added:</v-card-subtitle>
            <Artifact
              :currentArtifactInput="this.lastArtifact"
              :key="this.lastArtifact.id"
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
import Artifact from "@/components/Artifact.vue";

export default {
  props: {
    currentArtifactId: {
      type: String,
      required: false,
      default: null,
    },
  },
  components: {
    Artifact,
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
    if (this.$props.currentArtifactId) {
      let getArtifactData = await this.$store.dispatch(
        "cardInfo/getArtifact",
        this.$props.currentArtifactId
      );
      this.artifact = getArtifactData.data.getArtifact;
    } else {
      if (!(this.admin | this.mod)) {
        this.$router.push("/artifacts");
      }
    }

    this.$store.dispatch("cardInfo/getArtifactsData");
    // Subscribe to creation of Todo
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateArtifact)
    ).subscribe({
      next: ({ value }) => (this.lastArtifact = value.data.onCreateArtifact),
    });
  },
  data: () => ({
    loading: false,
    sucessMsg: "",
    errorMsg: "",
    lastArtifact: {
      name: "?",
      imgUrl: "logo.png",
      rarity: "?",
      tier: "?",
      description: "?",
      bonusR10: "?",
      bonusR20: "?",
    },
    artifacsDebug: false,
    artifact: {
      name: "?",
      imgUrl: "logo.png",
      rarity: "?",
      tier: "?",
      description: "?",
      bonusR10: "?",
      bonusR20: "?",
    },
    rarity: [
      "Mythic",
      "Rare",
      "Uncommon",
      "Common"
    ],
    tier: ["Legendary", "Greater", "Lesser"],
    userGroups: [],
    mod: false,
    admin: false,
  }),
  methods: {
    async submitArtifact(artifact) {
      try {
        this.loading = true;
        this.sucessMsg = "";
        this.errorMsg = "";

        this.artifact.updatedBy = this.user.username;
        this.artifact.updatedById = this.user.id;

        if (this.$props.currentArtifactId) {
          if (this.admin | this.mod) {
            await this.$store.dispatch("cardInfo/updateArtifact", {
              file: "",
              artifactData: this.artifact,
            });
            this.sucessMsg = "Artifact Updated";
          } else {
            await this.$store.dispatch("cardInfo/submitArtifact", {
              file: "",
              artifactData: this.artifact,
            });
            this.sucessMsg =
              "Your update was submited for review. It will be visible after mod approval.";
          }
        } else {
          await this.$store.dispatch("cardInfo/createArtifact", {
            file: "",
            artifactData: this.artifact,
          });
          this.sucessMsg = "Artifact Added";
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errorMsg = error.errors[0].message;
        console.log("error adding the artifact", error);
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      artifacts: "cardInfo/artifacts",
    }),
  },
};
</script>
