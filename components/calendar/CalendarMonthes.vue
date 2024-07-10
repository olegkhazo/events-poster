<script setup></script>

<template>
  <div class="calendar-monthes">
    <div class="next-month">
      <NuxtImg src="/images/next.png" />
      <span>JUNE</span>
    </div>
    <h2 class="curent-month">JULY 2024</h2>
    <div class="prev-month">
      <span>AUGUST</span>
      <NuxtImg src="/images/next.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.calendar-monthes {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .prev-month,
  .next-month {
    display: flex;
    align-items: center;
    border: 1px solid $gray-100;
    padding: 5px 10px;
    cursor: pointer;
    color: $gray-100;
    border-radius: 3px;

    &:hover {
      background: $gray-300;
    }
  }

  .prev-month img {
    transform: rotate(180deg);
  }
}
</style>
