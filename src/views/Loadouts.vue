<template>
  <div class="home">
    <Loadouts />
  </div>
</template>

<script>
// @ is an alias to /src
import Loadouts from "@/components/Loadouts.vue";

export default {
  name: "Home",
  components: {
    Loadouts,
  },
};
</script>
