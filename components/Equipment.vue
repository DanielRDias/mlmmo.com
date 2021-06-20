<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title>{{ currentEquipment.name }}</v-card-title>
    <v-img :src="currentEquipment.imgUrl" height="300px">
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
    <v-card-text>Slot: {{ currentEquipment["slot"] }} </v-card-text>
    <v-divider></v-divider>
    <v-card-text> {{ currentEquipment.description }} </v-card-text>
    <v-divider></v-divider>
    <v-card-text v-for="(mod, index) in currentEquipment.mods" :key="index">
      <strong>Mod {{index+1}}: </strong> {{ mod }}
    </v-card-text>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  props: {
    currentEquipmentId: {
      type: String,
      required: false,
      default: null,
    },
    currentEquipmentInput: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      show: false,
      getEquipmentData: null,
      currentEquipment: {
        id: "?",
        name: "?",
        imgUrl: "logo.png",
        slot: "?",
        description: "?",
        mods: ["?"],
      },
      dialShare: false,
      shareInfo: {
        url:
          "https://www.mlarpg.com/equipment?equipmentId=" +
          (this.$props.currentEquipmentInput !== null
            ? this.$props.currentEquipmentInput.id
            : this.$props.currentEquipmentId),
        title:
          this.$props.currentEquipmentInput !== null
            ? "Checkout this equipment: " + this.$props.currentEquipmentInput.name
            : "Checkout this equipment",
        description:
          this.$props.currentEquipmentInput !== null
            ? "Equipment: " +
              this.$props.currentEquipmentInput.name +
              " Description: " +
              this.$props.currentEquipmentInput.description
            : "Go to MLaRPG.com for more details.",
        hashtags: "MLaRPG,MagicLegends,ML",
        quote:
          this.$props.currentEquipmentInput !== null
            ? "Equipment: " +
              this.$props.currentEquipmentInput.name +
              " Description: " +
              this.$props.currentEquipmentInput.description
            : "Go to MLaRPG.com for more details.",
        twitteruser: "MLaRPG",
      },
    };
  },
  async mounted() {
    if (this.$props.currentEquipmentInput !== null) {
      this.currentEquipment = this.$props.currentEquipmentInput;
    } else if (this.$props.currentEquipmentId !== null) {
      this.getEquipmentData = await this.$store.dispatch(
        "cardInfo/getEquipment",
        this.$props.currentEquipmentId
      );
      this.currentEquipment = this.getEquipmentData.data.getEquipment;
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