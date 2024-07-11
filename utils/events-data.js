  function generateEvents() {
    const baseURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvIlY5jfwhC35p5cjEx_o5h5ontni-c34yeQ&s";
    const time = "8:00 am - 6:00 pm";
    const date = "2024-07-10";
    const events = [];
  
    for (let i = 1; i <= 30; i++) {
      events.push({
        img: baseURL,
        date: `2024-06-${String(i).padStart(2, '0')}`,
        time: time,
        event: `Event ${i}`
      });
    }
  
    return events;
  }
  
export const events = generateEvents();
  console.log(events);
  