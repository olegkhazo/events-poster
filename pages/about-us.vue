<script setup>
// useHead({
//   title: "MyNextParts - About Us",
//   meta: [
//     {
//       name: "description",
//       content:
//         "About Us",
//     },
//   ],
// });
</script>

<template>
  <div class="content-wrapper">
    <div class="about-us-wrapper">
      <h1>עלינו</h1>
      <div>
        <p><b>בחר אירוע</b> - שירות האירועים הטוב ביותר</p>
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
