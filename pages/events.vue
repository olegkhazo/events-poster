<script setup>
import { useAllEventsStore } from "~/stores/allEventsStore";

const { sortedByDateEventsCollection, currentFilteredEventCollection } =
  storeToRefs(useAllEventsStore());

const eventsAmount = ref(20);

// Get actual event collection for the view according to sortedByDateEventsCollection
const actualityCollection = computed(() => {
  return currentFilteredEventCollection.value.length > 0
    ? currentFilteredEventCollection.value
    : sortedByDateEventsCollection.value;
});

const displayedEvents = computed(() => {
  return actualityCollection.value.slice(0, eventsAmount.value);
});

function showNextEvents() {
  eventsAmount.value += 20;
}
</script>

<template>
  <div class="all-events-wrapper">
    <TheFilter />
    <div class="events-wrapper">
      <div class="event" v-for="event in displayedEvents" :key="event.Position">
        <SingleEventComponent :single-event-data="event" />
      </div>
    </div>
    <div class="btn-wrapper">
      <button @click="showNextEvents" class="events-show-btn">
        הצג את האירועים הבאים
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.all-events-wrapper {
  min-height: 60vh;
  margin: 0 auto;
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
      display: flex;
      margin-top: 20px;
      background: white;
      flex-wrap: wrap;
      justify-content: space-between;

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
