<script setup>
import { useCurrentEventStore } from "~/stores/currentEventStore";

const { currentEvent } = storeToRefs(useCurrentEventStore());
</script>

<template>
  <div class="single-event-wrapper">
    <div class="img-and-description">
      <div class="event-img">
        <NuxtImg :src="currentEvent.img" alt="Event image" />
      </div>
      <div class="event-main-info">
        <span class="title">{{ currentEvent.event }}</span>
        <span class="description">{{ currentEvent.description }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
</style>
