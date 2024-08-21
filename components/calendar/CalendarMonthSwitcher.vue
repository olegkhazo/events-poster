<script setup>
const props = defineProps({
  months: {
    type: Object,
    required: true,
  },
  isPreviousMonthAvailable: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["switchToAnotherMonth"]);
const switchToAnotherMonth = (step) => emit("switchToAnotherMonth", step);
</script>

<template>
  <div class="calendar-months">
    <div>
      <div
        v-if="isPreviousMonthAvailable"
        @click="switchToAnotherMonth(-1)"
        class="prev-month"
      >
        <NuxtImg src="/images/next.png" />
        <span>{{ months.previousMonth }}</span>
      </div>
    </div>

    <h2 class="curent-month">{{ props.months.currentMonthAndYear }}</h2>

    <div @click="switchToAnotherMonth(1)" class="next-month">
      <span>{{ props.months.nextMonth }}</span>
      <NuxtImg src="/images/next.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.calendar-months {
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

  .next-month img {
    transform: rotate(180deg);
  }
}
</style>
