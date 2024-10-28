<script setup>
useHead({
  title: "Pickevent - כל האירועים הישראלים במקום אחד",
  meta: [
    {
      name: "description",
      content: "אתר עם כל אירועי התרבות בישראל",
    },
  ],
});

import { useAllEventsStore } from "~/stores/allEventsStore";

const { allEvents, currentFilteredEventCollection } = storeToRefs(
  useAllEventsStore()
);

const dataIsLoaded = ref(false);

const { data: events } = await useFetch(`${API_URL}all-events`);

onMounted(() => {
  allEvents.value = events.value;
  dataIsLoaded.value = true;
});

const eventsAmount = ref(20);

// Get actual event collection for the view according to allEvents
const actualityCollection = computed(() => {
  return currentFilteredEventCollection.value.length > 0
    ? currentFilteredEventCollection.value
    : allEvents.value;
});

const displayedEvents = computed(() => {
  return actualityCollection.value.slice(0, eventsAmount.value);
});

const hasMoreEvents = computed(() => {
  return eventsAmount.value < actualityCollection.value.length;
});

function showNextEvents() {
  eventsAmount.value += 20;
}
</script>

<template>
  <div v-if="dataIsLoaded" class="all-events-wrapper">
    <TheFilter />
    <div class="events-wrapper">
      <div class="event" v-for="event in displayedEvents" :key="event.Position">
        <SingleEventComponent :single-event-data="event" />
      </div>
    </div>
    <div class="btn-wrapper" v-if="hasMoreEvents">
      <button @click="showNextEvents" class="events-show-btn">
        הצג את האירועים הבאים
      </button>
    </div>
  </div>
  <div v-else class="preloader">
    <NuxtImg src="/animation-cat.gif" alt="event image" />
    <span>קבלת המידע...</span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.preloader {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.all-events-wrapper {
  min-height: 60vh;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  width: 90%;

  .events-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .event {
      margin-top: 20px;
      background: white;
      border: 1px solid $gray-100;

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
  }

  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 50px;

    .events-show-btn {
      padding: 10px 100px;
      border: 1px solid $blue-200;
      color: $blue-200;
      background-color: $white;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
