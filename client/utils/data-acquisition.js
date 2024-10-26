import { BOT_API_URLS } from "~/utils/bot-api-urls";

export const fetchPageData = async (source) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BOT_API_URLS[source].API_KEY}`,
    },
  };

  try {
    const res = await fetch(
      `${BOT_API_URLS[source].URL}/${BOT_API_URLS[source].MAIN_PAGE_SCRAPER_ID}/tasks/${BOT_API_URLS[source].MAIN_PAGE_SCRAPER_TASK_KEY}`,
      options
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data.result.capturedLists.Events.map((event) => {
     
      return { ...event };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data";
  }
};
