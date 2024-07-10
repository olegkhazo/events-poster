<script setup>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import { daysOfWeek } from "~/utils/collections";
import { events } from "~/utils/events-data";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const currentMonth = ref(dayjs().month());
const currentYear = ref(dayjs().year());

const selectedDate = ref(null);

const startOfMonth = computed(() =>
  dayjs(new Date(currentYear.value, currentMonth.value, 1)).startOf("month")
);

const endOfMonth = computed(() =>
  dayjs(new Date(currentYear.value, currentMonth.value, 1)).endOf("month")
);

const daysMatrix = computed(() => {
  const startOfFirstWeek = startOfMonth.value.startOf("isoWeek");
  const endOfLastWeek = endOfMonth.value.endOf("isoWeek");
  const days = [];
  let day = startOfFirstWeek;

  while (day <= endOfLastWeek) {
    days.push(day);
    day = day.add(1, "day");
  }

  return Array.from({ length: 5 }, (_, i) => days.slice(i * 7, (i + 1) * 7));
});

const eventsForSelectedDate = computed(() => {
  if (!selectedDate.value) {
    return [];
  }
  return events.filter((event) =>
    dayjs(event.date).isSame(selectedDate.value, "day")
  );
});

const selectDate = (date) => {
  selectedDate.value = date;
};

function changeMonth(step) {
  if (currentMonth.value !== null && currentYear.value !== null) {
    currentMonth.value += step;

    if (currentMonth.value < 0) {
      currentMonth.value = 11;
      currentYear.value -= 1;
    } else if (currentMonth.value > 11) {
      currentMonth.value = 0;
      currentYear.value += 1;
    }
  }
}
</script>

<template>
  <div class="calendar-wrapper">
    <CalendarMonthSwitcher @switch-to-another-month="changeMonth" />
    <div class="calendar">
      <div class="calendar-header">
        <div v-for="day in daysOfWeek" :key="day" class="day-of-week">
          {{ day }}
        </div>
      </div>
      <div class="calendar-body">
        <div
          v-for="(week, weekIndex) in daysMatrix"
          :key="weekIndex"
          class="calendar-week"
        >
          <div
            v-for="day in week"
            :key="day.format('YYYY-MM-DD')"
            class="calendar-day"
            @click="selectDate(day)"
          >
            <span class="day-date">{{ day.date() }}</span>
            <span class="day-date-indicator"></span>
          </div>
        </div>
        <div class="event-block">
          <div v-if="eventsForSelectedDate.length > 0">
            <p>
              JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
              KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
            </p>
            <!-- <div v-for="event in eventsForSelectedDate" :key="event.date">
                {{ event.event }}
              </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.calendar-wrapper {
  margin: 70px 0 100px 0;

  .calendar {
    display: flex;
    flex-direction: column;
    width: 100%;

    .calendar-header {
      display: flex;
    }

    .day-of-week {
      width: calc(100% / 7);
      background-color: $gray-400;
      font-weight: 300;
      padding: 10px;
      font-size: 16px;
      border: 1px solid $gray-300;
    }

    .calendar-body {
      display: flex;
      flex-direction: column;

      .calendar-week {
        display: flex;

        .calendar-day {
          width: calc(100% / 7);
          position: relative;
          background: $white;
          padding: 10px;
          border: 1px solid $gray-300;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;

          &:before {
            content: "";
            display: block;
            padding-bottom: 80%;
          }

          &:hover {
            background: $blue-200;
            color: $white;

            .day-date-indicator {
              background: $white;
            }
          }

          .day-date {
            position: absolute;
            top: 15px;

            @media (max-width: 768px) {
              top: 5px;
            }
          }

          .day-date-indicator {
            position: absolute;
            top: 35px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $blue-200;

            @media (max-width: 768px) {
              top: 25px;
              width: 5px;
              height: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
