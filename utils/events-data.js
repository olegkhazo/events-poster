function generateEvents() {
  const img = "https://технология-бизнеса.рф/upload/iblock/a90/a9099e0b9b45a86ca4d5b88bb3bdfc32.jpg";
  const time = "8:00 - 6:00";
  const id = "0";
  const description = `המונחים 'מנהל אירועים", "שיווק אירועים", "אירועים" החלו לשמש יחסית לאחרונה. מומחה ידוע בתחום ניהול אירועים, ג'ו גולדבלט, מציין כי מקצוע זה נוצר באמצע המאה הקודמת עם פתיחת דיסנילנד בארה"ב.`;
  const events = [];

  for (let i = 1; i <= 30; i++) {
    const date = `2024-07-${String(i).padStart(2, '0')}`;
    events.push(
      {
        img: img,
        date: date,
        time: time,
        id: `${i}-1`,
        description: description,
        event: `מִקרֶה ${i} - 1`
      },
      {
        img: img,
        date: date,
        time: time,
        id: `${i}-2`,
        description: description,
        event: `מִקרֶה ${i} - 2`
      }
    );
  }

  return events;
}

export const events = generateEvents();
