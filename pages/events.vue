<script setup>
import { fetchPageData } from "~/utils/data-acquisition";
import { sortByDate } from "~/utils";

const ironitEventsCollection = ref([]);
const mishkanAshdodEventsCollection = ref([]);
const concantinatedEventsArray = ref([]);
const eventsAmount = ref(20);
const dataIsLoaded = ref(false);

onMounted(async () => {
  try {
    ironitEventsCollection.value = await fetchPageData("ironit");
    mishkanAshdodEventsCollection.value = await fetchPageData("mishkanAshdod");

    if (
      ironitEventsCollection.value.length > 0 &&
      mishkanAshdodEventsCollection.value.length > 0
    ) {
      concantinatedEventsArray.value = [
        ...mishkanAshdodEventsCollection.value,
        ...ironitEventsCollection.value,
      ];

      concantinatedEventsArray.value = sortByDate(
        concantinatedEventsArray.value
      );
    }

    dataIsLoaded.value = true;
  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});

const displayedEvents = computed(() => {
  return concantinatedEventsArray.value.slice(0, eventsAmount.value);
});

function showNextEvents() {
  eventsAmount.value += 20;
  console.log(eventsAmount.value);
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
    <div class="btn-wrapper">
      <button @click="showNextEvents" class="events-show-btn">
        Show Next Events
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

.preloader {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
