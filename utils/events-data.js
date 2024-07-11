function generateEvents() {
  const baseURL = "https://swimply-static.imgix.net/seo/hero/event.png?auto=compress%2Cformat&fit=min&fill=blur&w=2304&q=30&ixlib=react-9.8.1";
  const time = "8:00 - 6:00";
  const description = `המונחים 'מנהל אירועים", "שיווק אירועים", "אירועים" החלו לשמש יחסית לאחרונה. מומחה ידוע בתחום ניהול אירועים, ג'ו גולדבלט, מציין כי מקצוע זה נוצר באמצע המאה הקודמת עם פתיחת דיסנילנד בארה"ב.`;
  const events = [];

  for (let i = 1; i <= 30; i++) {
    const date = `2024-07-${String(i).padStart(2, '0')}`;
    events.push(
      {
        img: baseURL,
        date: date,
        time: time,
        description: description,
        event: `מִקרֶה ${i} - 1`
      },
      {
        img: baseURL,
        date: date,
        time: time,
        description: description,
        event: `מִקרֶה ${i} - 2`
      }
    );
  }

  return events;
}

export const events = generateEvents();
