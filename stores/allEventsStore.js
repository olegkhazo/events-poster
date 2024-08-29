import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { sortByDate } from "~/utils";

export const useAllEventsStore = defineStore('all-events-store', () => {
  const allEvents = ref([]);
  const sortedByDateEventsCollection = ref([]);
  const currentFilteredEventCollection = ref([]);

  watch(allEvents, (newVal) => {
    if (newVal.length > 0) {
      
      const uniqueEventsMap = new Map();

      newVal.forEach(event => {
        const key = `${event.eventDate}-${event.eventTitle}`;
        if (!uniqueEventsMap.has(key)) {
          uniqueEventsMap.set(key, event);
        }
      });

      const uniqueEvents = Array.from(uniqueEventsMap.values());
      
      sortedByDateEventsCollection.value = sortByDate(uniqueEvents);
    }
  });

  return { allEvents, currentFilteredEventCollection, sortedByDateEventsCollection };
});
