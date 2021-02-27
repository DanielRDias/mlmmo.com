<template>
  <div class="home">
    <Artifacts />
  </div>
</template>

<script>
// @ is an alias to /src
import Artifacts from "@/components/Artifacts.vue";

export default {
  name: "Home",
  components: {
    Artifacts,
  },
};
</script>
