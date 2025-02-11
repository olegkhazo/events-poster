import { BOT_API_URLS, BotApiUrls } from '../constants/apiUrls';
import NodeCache from 'node-cache';
import { updateFormatOfEventDate } from '../utils';

const cache = new NodeCache({ stdTTL: 3600 });

export const fetchEventsFromApi = async (source: keyof BotApiUrls) => {
  const cacheKey = `events_${source}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BOT_API_URLS[source].API_KEY}`,
    },
  };

  try {
    const taskResponse = await fetch(
      `${BOT_API_URLS[source].URL}/${BOT_API_URLS[source].MAIN_PAGE_SCRAPER_ID}/tasks`,
      options
    );

    if (!taskResponse.ok) {
      throw new Error(`Failed to fetch task IDs: ${taskResponse.status}`);
    }

    const taskData = await taskResponse.json();
    const taskIds = Array.isArray(taskData.result.robotTasks.items)
      ? taskData.result.robotTasks.items.map((item: any) => item.id)
      : [];


    let allEvents: any[] = [];

    for (const taskId of taskIds) {
      const res = await fetch(
        `${BOT_API_URLS[source].URL}/${BOT_API_URLS[source].MAIN_PAGE_SCRAPER_ID}/tasks/${taskId}`,
        options
      );

      if (!res.ok) {
        console.error(`HTTP error! Status: ${res.status} for taskId: ${taskId}`);
        continue;
      }

      const data = await res.json();

      if (Array.isArray(data.result.capturedLists.Events)) {
        allEvents = allEvents.concat(data.result.capturedLists.Events);
      }
    }
    
    const currentDate = new Date();
    
    const filteredAndSortedEvents = allEvents
    .map((event: any) => {
      const formattedEventDate = event.eventDate ? updateFormatOfEventDate(event.eventDate) : "";
      return { ...event, eventDate: formattedEventDate };
    })
    .filter((event: any) => {
      const eventDate = new Date(`${event.eventDate}T00:00:00`); 
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      return eventDate >= today; 
    })
    .sort((a: any, b: any) => {
      const dateA = new Date(`${a.eventDate}T00:00:00`);
      const dateB = new Date(`${b.eventDate}T00:00:00`);
      return dateA.getTime() - dateB.getTime();
    });

    cache.set(cacheKey, filteredAndSortedEvents);

    return filteredAndSortedEvents;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};