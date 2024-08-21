<script setup>
useHead({
  title: "Pickevent - עלינו",
  meta: [
    {
      name: "description",
      content: "אתר עם כל אירועי התרבות בישראל",
    },
  ],
});
</script>

<template>
  <div class="content-wrapper">
    <div class="about-us-wrapper">
      <h1>ברוכים הבאים לפלטפורמה המובילה לאירועים בעיר!</h1>
      <div>
        <p>כאן תמצאו את כל מה שמתרחש בעיר, במקום אחד נוח ומרכזי.</p>
        <p>
          אנו אוספים עבורכם מידע ממגוון רחב של מקורות ומוסדות עירוניים, כדי
          שתהיו הראשונים לדעת על האירועים הכי חמים – מתערוכות ייחודיות, דרך
          הופעות מרגשות ועד סדנאות מעשירות ופעילויות לכל המשפחה.
        </p>
        <p>
          עם מנוע חיפוש חכם ומתקדם, אתם במרחק קליק מלמצוא את האירועים שמתאימים
          בדיוק לכם. חפשו לפי תאריך, מיקום או קהל יעד, וגילו את האפשרויות
          האינסופיות שהעיר מציעה.
        </p>
        <p>
          הצטרפו לאלפי המשתמשים שכבר הופכים את החיפוש אחר אירועים לחוויה מהנה
          ומדויקת, ותבטיחו לעצמכם שלא תפספסו אף רגע חשוב. כי אצלנו, כל רגע הוא
          הזדמנות לחוויה חדשה!
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.content-wrapper {
  .about-us-wrapper {
    min-height: 80vh;
    h1 {
      font-size: 50px;
      font-weight: 300;

      @media (max-width: 834px) {
        font-size: 35px;
      }

      @media (max-width: 382px) {
        font-size: 28px;
      }
    }

    font-size: 16px;

    a {
      text-decoration: none;
      color: $blue;
      font-weight: 600;
    }
  }
}
</style>
