<script setup>
const props = defineProps({
  singleDataEvents: Object,
});
</script>

<template>
  <div class="event-list">
    <div
      v-for="event in props.singleDataEvents"
      :key="event"
      class="single-event"
    >
      <span>{{ event.date }}</span>
      <span>{{ event.event }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.event-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
  display: none;
  padding: 40px 0;
}
</style>
