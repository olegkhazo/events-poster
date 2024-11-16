<script setup>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";

import { useAllEventsStore } from "~/stores/allEventsStore";
import { useSelectedDate } from "~/stores/calendarStore";

const { allEvents, currentFilteredEventCollection } = storeToRefs(
  useAllEventsStore()
);

const { selectedDate } = storeToRefs(useSelectedDate());

import { daysOfWeek, monthsInHebrew } from "~/utils/collections";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const currentMonth = ref(dayjs().month());
const currentYear = ref(dayjs().year());

const selectedWeekIndex = ref(null);

const weekRefs = ref([]);

const dataIsLoaded = ref(false);

const { data: events } = await useFetch(`${API_URL}all-events`);

onMounted(async () => {
  allEvents.value = events.value;

  dataIsLoaded.value = true;

  const savedMonth = sessionStorage.getItem("selectedMonth");
  const savedYear = sessionStorage.getItem("selectedYear");

  if (savedMonth !== null && savedYear !== null) {
    currentMonth.value = parseInt(savedMonth);
    currentYear.value = parseInt(savedYear);
  }

  const savedDate = sessionStorage.getItem("selectedDate");
  if (savedDate) {
    selectedDate.value = dayjs(savedDate);
    const savedWeekIndex = sessionStorage.getItem("selectedWeekIndex");
    selectedWeekIndex.value =
      savedWeekIndex !== null ? parseInt(savedWeekIndex) : null;

    if (selectedWeekIndex.value !== null) {
      nextTick(() => {
        const weekElement = weekRefs.value[selectedWeekIndex.value];
        if (weekElement) {
          weekElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  } else {
    selectedDate.value = null;
  }
});

watch([currentMonth, currentYear], ([newMonth, newYear]) => {
  sessionStorage.setItem("selectedMonth", newMonth);
  sessionStorage.setItem("selectedYear", newYear);
});

watch([selectedDate, selectedWeekIndex], ([newDate, newWeekIndex]) => {
  if (newDate && dayjs.isDayjs(newDate)) {
    sessionStorage.setItem("selectedDate", newDate.format());
    sessionStorage.setItem(
      "selectedWeekIndex",
      newWeekIndex !== null ? newWeekIndex.toString() : ""
    );
  } else {
    sessionStorage.removeItem("selectedDate");
    sessionStorage.removeItem("selectedWeekIndex");
    sessionStorage.removeItem("selectedMonth");
    sessionStorage.removeItem("selectedYear");
  }
});

// Last date check
const isPastDate = (date) => {
  return dayjs(date).isBefore(dayjs(), "day");
};

// Current event collection
const actualityCollection = computed(() => {
  return currentFilteredEventCollection.value.length > 0
    ? currentFilteredEventCollection.value
    : allEvents.value;
});

// Choose data logic
const selectDate = (date, weekIndex) => {
  const newMonth = date.month();
  const newYear = date.year();

  if (currentMonth.value === newMonth && currentYear.value === newYear) {
    selectedDate.value =
      selectedDate.value && selectedDate.value.isSame(date, "day")
        ? null
        : date;
    selectedWeekIndex.value = selectedDate.value ? weekIndex : null;
  }
};

// Beginning of the month
const startOfMonth = computed(() =>
  dayjs(new Date(currentYear.value, currentMonth.value, 1)).startOf("month")
);

// End of the month
const endOfMonth = computed(() =>
  dayjs(new Date(currentYear.value, currentMonth.value, 1)).endOf("month")
);

// Month matrix broced be weeks
const daysMatrix = computed(() => {
  const startOfFirstWeek = startOfMonth.value.startOf("week");
  const endOfLastWeek = endOfMonth.value.endOf("week");
  const days = [];
  let day = startOfFirstWeek;

  while (day <= endOfLastWeek) {
    days.push({
      date: day,
      isPast: isPastDate(day),
    });
    day = day.add(1, "day");
  }

  return Array.from({ length: Math.ceil(days.length / 7) }, (_, i) =>
    days.slice(i * 7, (i + 1) * 7)
  );
});

function changeMonth(step) {
  currentMonth.value += step;

  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  }
}

// Is currrent month фмфшдфиду
const isPreviousMonthAvailable = computed(() => {
  const currentDate = dayjs();
  const selectedDate = dayjs(new Date(currentYear.value, currentMonth.value));
  return selectedDate.isAfter(currentDate, "month");
});

// Events for current date
const eventsForSelectedDate = computed(() => {
  if (!selectedDate.value) {
    return [];
  }

  const selectedDateString = selectedDate.value.format("YYYY-MM-DD");

  return actualityCollection.value.filter((collection) => {
    const eventDate = dayjs(collection.event_date).format("YYYY-MM-DD");
    return eventDate === selectedDateString;
  });
});

// Events by days
const eventsForDay = computed(() => {
  const events = {};

  actualityCollection.value.forEach((collection) => {
    const eventDate = dayjs(collection.event_date).format("YYYY-MM-DD");
    if (!events[eventDate]) {
      events[eventDate] = [];
    }
    events[eventDate].push(collection);
  });

  return events;
});

// Data for month switch component
const calendarMonthSwitcherData = {
  currentMonthAndYear: computed(() => {
    const month = dayjs(new Date(currentYear.value, currentMonth.value)).format(
      "MMMM"
    );
    const year = dayjs(new Date(currentYear.value, currentMonth.value)).format(
      "YYYY"
    );
    return `${monthsInHebrew[month]} ${year}`;
  }),
  previousMonth: computed(() => {
    const month = dayjs(new Date(currentYear.value, currentMonth.value))
      .subtract(1, "month")
      .format("MMMM");
    return monthsInHebrew[month];
  }),
  nextMonth: computed(() => {
    const month = dayjs(new Date(currentYear.value, currentMonth.value))
      .add(1, "month")
      .format("MMMM");
    return monthsInHebrew[month];
  }),
};
</script>

<template>
  <div v-if="dataIsLoaded" class="calendar-wrapper">
    <CalendarMonthSwitcher
      :months="calendarMonthSwitcherData"
      :is-previous-month-available="isPreviousMonthAvailable"
      @switch-to-another-month="changeMonth"
    />
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
          ref="weekRefs"
          class="calendar-week"
        >
          <div
            v-for="dayObj in week"
            :key="dayObj.date.format('YYYY-MM-DD')"
            :class="[
              'calendar-day',
              { 'selected-day': dayObj.date.isSame(selectedDate, 'day') },
              { 'past-day': dayObj.isPast },
            ]"
            @click="!dayObj.isPast && selectDate(dayObj.date, weekIndex)"
          >
            <span v-if="dayObj.date.month() === currentMonth" class="day-date">
              {{ dayObj.date.date() }}
            </span>

            <span
              v-if="
                eventsForDay[dayObj.date.format('YYYY-MM-DD')] &&
                eventsForDay[dayObj.date.format('YYYY-MM-DD')].length > 0 &&
                dayObj.date.month() === currentMonth
              "
              class="day-date-indicator"
            ></span>

            <span
              v-if="
                eventsForDay[dayObj.date.format('YYYY-MM-DD')] &&
                dayObj.date.month() === currentMonth &&
                !dayObj.isPast
              "
              class="number-of-events"
            >
              אירועים:
              {{ eventsForDay[dayObj.date.format("YYYY-MM-DD")].length }}
            </span>
          </div>

          <div
            v-if="
              eventsForSelectedDate.length > 0 &&
              selectedWeekIndex === weekIndex &&
              selectedDate &&
              selectedDate.month() === currentMonth &&
              selectedDate.year() === currentYear
            "
            class="event-block"
          >
            <h3>
              אירועים עבור
              <span class="date-of-list">
                {{
                  selectedDate && dayjs.isDayjs(selectedDate)
                    ? selectedDate.format("D")
                    : ""
                }}
                {{ calendarMonthSwitcherData.currentMonthAndYear }}
              </span>
            </h3>
            <hr />
            <CalendarEventsBlock :single-data-events="eventsForSelectedDate" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="preloader">
    <NuxtImg src="/animation-cat.gif" alt="event image" />
    <span>קבלת המידע...</span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.preloader {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.calendar-wrapper {
  width: 90%;
  margin: 100px auto;

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
        flex-wrap: wrap;

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

          .number-of-events {
            color: $green-600;
            font-weight: 600;
            font-size: 12px;
          }
        }

        .past-day {
          background: $gray-300;
          color: $gray-700;
          border: 1px solid $gray-400;
          cursor: not-allowed;

          .day-date-indicator {
            display: none;
          }

          &:hover {
            background: $gray-300;
            color: $gray-700;
          }
        }

        .selected-day {
          background: $gray-400;
          border-bottom: none;

          &:hover {
            background: $gray-400;
          }

          .day-date-indicator {
            display: none;
          }

          .day-date {
            color: $gray-1000;
            font-weight: 600;
          }
        }

        .event-block {
          width: 100%;
          padding: 0 20px 40px 20px;
          border: 1px solid $gray-300;
          border-top: none;
          background: $gray-400;

          hr {
            height: 1px;
            background-color: $gray-300;
            border: none;
            margin-block-start: 0;
            margin-block-end: 0;
          }

          .date-of-list {
            color: $blue-200;
            font-size: 24px;
            margin-right: 8px;

            @media (max-width: 768px) {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
