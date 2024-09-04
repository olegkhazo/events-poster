import { sortByDate } from "~/utils";

export const useAllEventsStore = defineStore('all-events-store', () => {
  const allEvents = ref([]);
  const sortedByDateEventsCollection = ref([]);
  const currentFilteredEventCollection = ref([]);

  watch(allEvents, (newVal) => {
    if (newVal.length > 0) {
      console.log(allEvents.value);
      const uniqueEventsMap = new Map();

      newVal.forEach(event => {
        const { eventDate, eventTime, eventTitle } = event;
        
        let shouldAddEvent = true;

        uniqueEventsMap.forEach((existingEvent, key) => {
          const { eventDate: existingDate, eventTime: existingTime, eventTitle: existingTitle } = existingEvent;

          const dateMatch = (existingDate && eventDate && (existingDate.includes(eventDate) || eventDate.includes(existingDate)));
          const timeMatch = (existingTime && eventTime && (existingTime.replace(/\s+/g, '').includes(eventTime.replace(/\s+/g, '')) || eventTime.replace(/\s+/g, '').includes(existingTime.replace(/\s+/g, ''))));
          const titleMatch = (existingTitle && eventTitle && (existingTitle.includes(eventTitle) || eventTitle.includes(existingTitle)));

          if (dateMatch && timeMatch && titleMatch) {
            shouldAddEvent = false;

            if (eventTitle.length > existingTitle.length) {
              uniqueEventsMap.set(key, event);
            }
          }
        });

        if (shouldAddEvent) {
          const key = `${eventDate}-${eventTime}-${eventTitle}`;
          uniqueEventsMap.set(key, event);
        }
      });

      const uniqueEvents = Array.from(uniqueEventsMap.values());

      sortedByDateEventsCollection.value = sortByDate(uniqueEvents);
    }
  });

  return { allEvents, currentFilteredEventCollection, sortedByDateEventsCollection };
});
