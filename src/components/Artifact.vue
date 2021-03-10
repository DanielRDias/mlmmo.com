<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title>{{ currentArtifact.name }}</v-card-title>
    <v-img :src="currentArtifact.imgUrl" height="300px">
      <v-speed-dial
        v-model="dialShare"
        absolute
        left
        top
        direction="bottom"
        open-on-hover
      >
        <template v-slot:activator>
          <v-btn fab top right x-small color="primary">
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
          <v-btn
            style="text-decoration: none"
            dark
            fab
            bottom
            color="blue"
            x-small
            class="ma-1 mt-n2"
          >
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
          <v-btn dark fab bottom color="blue" x-small class="ma-1">
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
          <v-btn dark fab bottom color="red" x-small class="ma-1">
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
          <v-btn dark fab bottom color="green" x-small class="ma-1">
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
          <v-btn dark fab bottom x-small class="ma-1">
            <v-icon>mdi-email</v-icon>
          </v-btn>
        </ShareNetwork>
        <v-btn dark fab bottom x-small @click="copyText()">
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-img>

    <v-divider></v-divider>
    <v-card-text> {{ currentArtifact["tier"] }} </v-card-text>
    <v-divider></v-divider>
    <v-card-text> {{ currentArtifact.description }} </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <strong>Rank 10: </strong> {{ currentArtifact.bonusR10 }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text
      v-if="
        currentArtifact['tier'] !== null &&
        currentArtifact['tier'].toLowerCase() !== 'lesser'
      "
    >
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
  data() {
    return {
      show: false,
      getArtifactData: null,
      currentArtifact: {
        id: "?",
        name: "?",
        imgUrl: "logo.png",
        tier: "?",
        description: "?",
        bonusR10: "?",
        bonusR20: "?",
      },
      dialShare: false,
      shareInfo: {
        url:
          "https://www.mlarpg.com/artifact?artifactId=" +
          (this.$props.currentArtifactInput !== null
            ? this.$props.currentArtifactInput.id
            : this.$props.currentArtifactId),
        title:
          this.$props.currentArtifactInput !== null
            ? "Checkout this artifact: " + this.$props.currentArtifactInput.name
            : "Checkout this artifact",
        description:
          this.$props.currentArtifactInput !== null
            ? "Artifact: " +
              this.$props.currentArtifactInput.name +
              " Description: " +
              this.$props.currentArtifactInput.description
            : "Go to MLaRPG.com for more details.",
        hashtags: "MLaRPG,MagicLegends,ML",
        quote:
          this.$props.currentArtifactInput !== null
            ? "Artifact: " +
              this.$props.currentArtifactInput.name +
              " Description: " +
              this.$props.currentArtifactInput.description
            : "Go to MLaRPG.com for more details.",
        twitteruser: "MLaRPG",
      },
    };
  },
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
  },
};
</script>
<style scoped>
a:link {
  text-decoration: none;
}
</style>