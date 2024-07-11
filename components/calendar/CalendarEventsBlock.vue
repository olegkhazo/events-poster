<script setup>
const props = defineProps({
  singleDataEvents: Object,
});
</script>

<template>
  <div class="event-list">
    <p>something</p>
    <!-- <div
      v-for="event in props.singleDataEvents"
      :key="event"
      class="single-event"
    >
      <span>{{ event.date }}</span>
      <span>{{ event.event }}</span>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.event-list {
}
</style>
