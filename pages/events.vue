<script setup>
import { fetchPageData } from "~/utils/data-acquisition";
import { sortByDate } from "~/utils";

const ironitEventsCollection = ref([]);
const mishkanAshdodEventsCollection = ref([]);
const concantinatedEventsArray = ref([]);

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
  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});
</script>

<template>
  <div class="all-events-wrapper">
    <TheFilter />
    <div class="events-wrapper">
      <div
        class="event"
        v-for="event in concantinatedEventsArray"
        :key="event.Position"
      >
        <SingleEventComponent :single-event-data="event" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.all-events-wrapper {
  min-height: 60vh;
  margin: 20px auto 100px auto;
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
      flex-wrap: wrap;
      justify-content: space-between;

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
  }
}
</style>
