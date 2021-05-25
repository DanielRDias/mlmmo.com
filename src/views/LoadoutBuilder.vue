<template>
  <div class="home">
    <LoadoutBuilder :currentLoadoutId="currentLoadoutId" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoadoutBuilder from "@/components/LoadoutBuilder.vue";

export default {
  name: "Home",
  components: {
    LoadoutBuilder,
  },
  data() {
    return {
      currentLoadoutId: this.$route.query.loadoutId,
    };
  },
};
</script>
