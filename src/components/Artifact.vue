<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title>{{ currentArtifact.name }}</v-card-title>
    <v-img :src="currentArtifact.imgUrl" height="300px"> </v-img>

    <v-divider></v-divider>
    <v-card-text> {{ currentArtifact.description }} </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <strong>Rank 10: </strong> {{ currentArtifact.bonusR10 }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <strong>Rank 20: </strong> {{ currentArtifact.bonusR20 }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    currentArtifactId: {
      type: String,
      required: false,
      default: null,
    },
    currentArtifactInput: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data: () => ({
    show: false,
    getArtifactData: null,
    currentArtifact: {
      id: "?",
      name: "?",
      imgUrl: "logo.png",
      rarity: "?",
      description: "?",
      bonusR10: "?",
      bonusR20: "?",
    },
  }),
  async mounted() {
    if (this.$props.currentArtifactInput !== null) {
      this.currentArtifact = this.$props.currentArtifactInput;
    } else if (this.$props.currentArtifactId !== null) {
      this.getArtifactData = await this.$store.dispatch(
        "cardInfo/getArtifact",
        this.$props.currentArtifactId
      );
      this.currentArtifact = this.getArtifactData.data.getArtifact;
    }
  },
};
</script>