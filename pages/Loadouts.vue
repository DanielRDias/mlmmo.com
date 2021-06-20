<template>
  <div class="home">
    <Loadouts :username="username" />
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
  data() {
    return {
      username: this.$route.query.username,
    };
  },
};
</script>
