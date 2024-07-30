<script setup>
const props = defineProps({
  months: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["switchToAnotherMonth"]);
const switchToAnotherMonth = (step) => emit("switchToAnotherMonth", step);
</script>

<template>
  <div class="calendar-monthes">
    <div @click="switchToAnotherMonth(-1)" class="next-month">
      <NuxtImg src="/images/next.png" />
      <span>{{ props.months.previousMonth }}</span>
    </div>
    <h2 class="curent-month">{{ props.months.currentMonthAndYear }}</h2>
    <div @click="switchToAnotherMonth(1)" class="prev-month">
      <span>{{ props.months.nextMonth }}</span>
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
    border: 1px solid $black;
    background: $white;
    padding: 5px 10px;
    cursor: pointer;
    color: $black;
    border-radius: 3px;
    transition: background-color 0.5s ease, color 0.5s ease;

    &:hover {
      background: $gray-400;
    }
  }

  .prev-month img {
    transform: rotate(180deg);
  }
}
</style>
