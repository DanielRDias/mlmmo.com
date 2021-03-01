<template>
  <div class="home">
    <ManageArtifacts :currentArtifactId="currentArtifactId" />
  </div>
</template>

<script>
// @ is an alias to /src
import ManageArtifacts from "@/components/ManageArtifacts.vue";

export default {
  name: "Home",
  components: {
    ManageArtifacts,
  },
  data() {
    return {
      currentArtifactId: this.$route.query.artifactId,
    };
  },
};
</script>
