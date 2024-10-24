
export const useAllEventsStore = defineStore('all-events-store', () => {
  const allEvents = ref([]);
  const sortedByDateEventsCollection = ref([]);
  const currentFilteredEventCollection = ref([]);

  
  
  watch(allEvents, (newVal) => {
    const eventsArray = newVal.value || newVal;

    console.log('Events length:', eventsArray.length); 


    if (eventsArray.length > 0) {
      sortedByDateEventsCollection.value = newVal;
    }
  });

  return { allEvents, currentFilteredEventCollection, sortedByDateEventsCollection };
});
