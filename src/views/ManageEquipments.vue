<template>
  <div class="home">
    <ManageEquipments :currentEquipmentId="currentEquipmentId" />
  </div>
</template>

<script>
// @ is an alias to /src
import ManageEquipments from "@/components/ManageEquipments.vue";

export default {
  name: "Home",
  components: {
    ManageEquipments,
  },
  data() {
    return {
      currentEquipmentId: this.$route.query.equipmentId,
    };
  },
};
</script>
