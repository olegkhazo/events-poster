import { defineStore } from 'pinia';
import { ref } from 'vue';
import { sortByDate } from "~/utils";

export const useAllEventsStore = defineStore('all-events-store', () => {
  const allEvents = ref([]);
  const sortedByDateEventsCollection = ref([]);
  const currentFilteredEventCollection = ref([]);

  watch(allEvents, (newVal) => {
    if(newVal.length > 0) {
        sortedByDateEventsCollection.value = sortByDate(newVal)
    }
  })


  return { allEvents, currentFilteredEventCollection, sortedByDateEventsCollection };
});