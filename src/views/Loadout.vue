<template>
  <div class="home">
    <Loadout :currentLoadoutId="currentLoadoutId" />
  </div>
</template>

<script>
// @ is an alias to /src
import Loadout from "@/components/Loadout.vue";

export default {
  name: "Home",
  components: {
    Loadout,
  },
  data() {
    return {
      currentLoadoutId: this.$route.query.loadoutId,
    };
  },
};
</script>
