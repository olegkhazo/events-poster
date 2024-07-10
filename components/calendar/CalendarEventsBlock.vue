<script setup>
const props = defineProps({
  singleDataEvents: Object,
});
</script>

<template>
  <div class="event-list">
    <!-- <div v-if="day.isSame(selectedDate.value, 'day')">
      <div v-for="event in getEventsForDate(day)" :key="event.date">
        {{ event.event }}
      </div>
    </div> -->
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
}
</style>
