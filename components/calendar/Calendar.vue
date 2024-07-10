<script setup>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const events = [
  { date: "2024-07-01", event: "Event 1" },
  { date: "2024-07-05", event: "Event 2" },
  { date: "2024-07-10", event: "Event 3" },
  // Add your events here
];

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

const getEventsForDate = (date) => {
  return events.filter((event) => dayjs(event.date).isSame(date, "day"));
};

const selectDate = (date) => {
  selectedDate.value = date;
};
</script>

<template>
  <div class="calendar-wrapper">
    <CalendarMonthes />

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
            {{ day.date() }}
            <div v-if="day.isSame(selectedDate, 'day')" class="event-list">
              <div v-for="event in getEventsForDate(day)" :key="event.date">
                {{ event.event }}
              </div>
            </div>
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
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
  }

  .calendar-header {
    display: contents;
  }

  .day-of-week {
    background-color: #f0f0f0;
    text-align: center;
    padding: 10px;
    font-weight: bold;
  }

  .calendar-body {
    display: contents;
  }

  .calendar-week {
    display: contents;
  }

  .calendar-day {
    background-color: #fff;
    border: 1px solid #ddd;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    position: relative;
    height: 100px; /* Adjust as needed */
  }

  .event-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;
    display: none;
  }

  .calendar-day:hover .event-list {
    display: block;
  }
}
</style>
