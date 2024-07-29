
// const fetchMainIronitPageData = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${BOT_API_URLS.ironit.API_KEY}`,
//       },
//     };
  
//     try {
//       const res = await fetch(
//         `${BOT_API_URLS.ironit.URL}/${BOT_API_URLS.ironit.MAIN_PAGE_SCRAPER_ID}/tasks/${BOT_API_URLS.ironit.MAIN_PAGE_SCRAPER_TASK_KEY}`,
//         options
//       );
  
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
  
//       const data = await res.json();
  
//       ironitEventsCollection.value = data.result.capturedLists.Events.map(
//         (event) => {
//           const formattedEventDate = updateFormatOfEventDate(event.eventDate);
  
//           return { ...event, eventDate: formattedEventDate };
//         }
//       );
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       ironitEventsCollection.value = "Error fetching data";
//     }
//   };
  
//   const fetchMishkanAshdodData = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${BOT_API_URLS.mishkanAshdod.API_KEY}`,
//       },
//     };
  
//     try {
//       const res = await fetch(
//         `${BOT_API_URLS.ironit.URL}/${BOT_API_URLS.mishkanAshdod.MAIN_PAGE_SCRAPER_ID}/tasks/${BOT_API_URLS.mishkanAshdod.MAIN_PAGE_SCRAPER_TASK_KEY}`,
//         options
//       );
  
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
  
//       const data = await res.json();
  
//       mishkanAshdodEventsCollection.value = data.result.capturedLists.Events;
  
//       mishkanAshdodEventsCollection.value.shift();
  
//       mishkanAshdodEventsCollection.value.map((event) => {
//         const formattedEventDate = updateFormatOfEventDate(event.eventDate);
  
//         return { ...event, eventDate: formattedEventDate };
//       });
//       concantinatedEventsArray.value = [
//         ...mishkanAshdodEventsCollection.value,
//         ...ironitEventsCollection.value,
//       ];
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       mishkanAshdodEventsCollection.value = "Error fetching data";
//     }
//   };