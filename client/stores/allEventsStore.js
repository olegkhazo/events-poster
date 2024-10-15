import { sortByDate } from "~/utils";

export const useAllEventsStore = defineStore('all-events-store', () => {
  const allEvents = ref([]);
  const sortedByDateEventsCollection = ref([]);
  const currentFilteredEventCollection = ref([]);

  watch(allEvents, (newVal) => {
    if (newVal.length > 0) {
      const uniqueEventsMap = new Map();

      newVal.forEach(event => {
        const normalizeString = (str) => {
          return str ? str.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/gi, '') : '';
        };

        const { eventDate, eventTime, eventTitle } = event;

        let shouldAddEvent = true;

        uniqueEventsMap.forEach((existingEvent, key) => {
          const { eventDate: existingDate, eventTime: existingTime, eventTitle: existingTitle } = existingEvent;

          const normalizedExistingDate = normalizeString(existingDate);
          const normalizedEventDate = normalizeString(eventDate);

          const normalizedExistingTime = normalizeString(existingTime);
          const normalizedEventTime = normalizeString(eventTime);

          const normalizedExistingTitle = normalizeString(existingTitle);
          const normalizedEventTitle = normalizeString(eventTitle);

          const dateMatch = (normalizedExistingDate.includes(normalizedEventDate) || normalizedEventDate.includes(normalizedExistingDate));
          const timeMatch = (normalizedExistingTime.includes(normalizedEventTime) || normalizedEventTime.includes(normalizedExistingTime));
          const titleMatch = (normalizedExistingTitle.includes(normalizedEventTitle) || normalizedEventTitle.includes(normalizedExistingTitle));

          if (dateMatch && timeMatch && titleMatch) {
            shouldAddEvent = false;

            // Если новое событие имеет более полное название, заменить существующее
            if (eventTitle && eventTitle.length > (existingTitle?.length || 0)) {
              uniqueEventsMap.set(key, event);
            }
          }
        });

        if (shouldAddEvent) {
          const key = `${normalizeString(eventDate)}-${normalizeString(eventTime)}-${normalizeString(eventTitle)}`;
          uniqueEventsMap.set(key, event);
        }
      });

      const uniqueEvents = Array.from(uniqueEventsMap.values());

      sortedByDateEventsCollection.value = sortByDate(uniqueEvents);
    }
  });

  return { allEvents, currentFilteredEventCollection, sortedByDateEventsCollection };
});
