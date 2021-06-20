<template>
  <div class="home">
    <Equipment :currentEquipmentId="currentEquipmentId" />
  </div>
</template>

<script>
// @ is an alias to /src
import Equipment from "@/components/Equipment.vue";

export default {
  name: "Home",
  components: {
    Equipment,
  },
  data() {
    return {
      currentEquipmentId: this.$route.query.equipmentId,
    };
  },
};
</script>
