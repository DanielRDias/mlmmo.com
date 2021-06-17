<template>
  <div class="home">
    <Equipments />
  </div>
</template>

<script>
// @ is an alias to /src
import Equipments from "@/components/Equipments.vue";

export default {
  name: "Home",
  components: {
    Equipments,
  },
};
</script>
