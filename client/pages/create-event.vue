<script setup>
useHead({
  title: "Pickevent - ליצור את האירוע שלך",
  meta: [
    {
      name: "ליצור את האירוע שלך",
      content: "ליצור את האירוע שלך",
    },
  ],
});
</script>

<template>
  <div class="add-event-wrapper">
    <CreateUpdateEventForm />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
</style>
