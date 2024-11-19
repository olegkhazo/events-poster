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
  <div class="curent-month-wrapper">
    <h2 class="curent-month">{{ props.months.currentMonthAndYear }}</h2>
  </div>
  <div class="calendar-months">
    <div>
      <div
        v-if="isPreviousMonthAvailable"
        @click="switchToAnotherMonth(-1)"
        class="prev-month"
      >
        <NuxtImg src="/images/black-arrow.swg" />
        <span>{{ months.previousMonth }}</span>
      </div>
    </div>

    <div @click="switchToAnotherMonth(1)" class="next-month">
      <span>{{ props.months.nextMonth }}</span>
      <NuxtImg src="/images/black-arrow.svg" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.curent-month-wrapper {
  display: flex;
  align-items: center;
  color: $black-1000;
  justify-content: center;

  .curent-month {
    font-size: 40px;
    font-weight: 600;
    margin: 0;

    @media (max-width: 1280px) {
      font-size: 32px;
    }
  }
}

.calendar-months {
  color: $black-1000;
  margin: 10px auto;
  font-size: 34px;
  display: flex;
  padding: 0 100px;
  justify-content: space-between;

  @media (max-width: 1280px) {
    padding: 0;
    font-size: 20px;
  }

  .prev-month,
  .next-month {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: $gray-400;
    }
  }

  .next-month {
    img {
      width: 23px;
      width: 12px;
      margin: 10px 12px 0 0;

      @media (max-width: 1280px) {
        margin: 4px 12px 0 0;

        width: 8px;
      }
    }
  }
}
</style>
