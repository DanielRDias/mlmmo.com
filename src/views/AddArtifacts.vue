<template>
  <div class="home">
    <AddArtifact />
  </div>
</template>

<script>
// @ is an alias to /src
import AddArtifact from "@/components/AddArtifact.vue";

export default {
  name: "Home",
  components: {
    AddArtifact,
  },
};
</script>
