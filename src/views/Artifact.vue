<template>
  <div class="home">
    <Artifact :currentArtifactId="currentArtifactId" />
  </div>
</template>

<script>
// @ is an alias to /src
import Artifact from "@/components/Artifact.vue";

export default {
  name: "Home",
  components: {
    Artifact,
  },
  data() {
    return {
      currentArtifactId: this.$route.query.artifactId,
    };
  },
};
</script>
