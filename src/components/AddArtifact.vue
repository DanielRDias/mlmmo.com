<template>
  <div class="home">
    <v-container id="user-profile-view" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card icon="mdi-account-outline">
            <h1>Add a artifact</h1>
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
                      v-model="artifact.rarity"
                      :items="rarity"
                      label="Rarity"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="12">
                    <v-text-field v-model="artifact.imgUrl" label="Image URL" />
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
                    <v-btn color="primary" min-width="150" @click="addArtifact">
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
            <v-card-title>{{ lastArtifact.name }}</v-card-title>
            <v-img :src="lastArtifact.imgUrl"></v-img>
            <v-card-text>Rarity: {{ lastArtifact.rarity }}</v-card-text>
            <v-card-text
              >Description: {{ lastArtifact.description }}</v-card-text
            >
            <v-card-text>R10: {{ lastArtifact.bonusR10 }}</v-card-text>
            <v-card-text>R20: {{ lastArtifact.bonusR20 }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-btn text color="teal accent-4" @click="artifacsDebug = !artifacsDebug">
      Debugging
    </v-btn>
    <v-card class="overflow-y-auto" max-height="500" v-if="artifacsDebug">
      <div v-for="(artifact, idx) in artifacts" :key="idx">
        <div class="text-2xl">{{ artifact }}</div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "@/graphql/subscriptions";

export default {
  async mounted() {
    this.$store.dispatch("cardInfo/getArtifactsData");
    // Subscribe to creation of Todo
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateArtifact)
    ).subscribe({
      next: ({ value }) => (this.lastArtifact = value.data.onCreateArtifact),
    });
  },
  data: () => ({
    lastArtifact: {
      name: "?",
      imgUrl: "logo.png",
      rarity: "?",
      description: "?",
      bonusR10: "?",
      bonusR20: "?",
    },
    artifacsDebug: false,
    artifact: {
      name: "?",
      imgUrl: "logo.png",
      rarity: "?",
      description: "?",
      bonusR10: "?",
      bonusR20: "?",
    },
    rarity: ["Legendary", "Greater", "Lesser"],
  }),
  methods: {
    async addArtifact(artifact) {
      try {
        await this.$store.dispatch("cardInfo/createArtifact", {
          file: "",
          artifactData: this.artifact,
        });
      } catch (error) {
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
