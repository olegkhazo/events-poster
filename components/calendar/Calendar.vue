<script setup>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import { useAllEventsStore } from "~/stores/allEventsStore";

const { allEvents } = storeToRefs(useAllEventsStore());
import { daysOfWeek, monthsInHebrew } from "~/utils/collections";
import { updateFormatOfEventDate } from "~/utils/";
import { fetchPageData } from "~/utils/data-acquisition";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const currentMonth = ref(dayjs().month());
const currentYear = ref(dayjs().year());

const selectedDate = ref({});
const selectedWeekIndex = ref(null);

const ironitEventsCollection = ref([]);
const mishkanAshdodEventsCollection = ref([]);

const dataIsLoaded = ref(false);

onMounted(async () => {
  try {
    ironitEventsCollection.value = await fetchPageData("ironit");
    mishkanAshdodEventsCollection.value = await fetchPageData("mishkanAshdod");

    if (
      ironitEventsCollection.value.length > 0 &&
      mishkanAshdodEventsCollection.value.length > 0
    ) {
      allEvents.value = [
        ...mishkanAshdodEventsCollection.value,
        ...ironitEventsCollection.value,
      ];
    }
    dataIsLoaded.value = true;
  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});

const selectDate = (date, weekIndex) => {
  selectedDate.value = date;
  selectedWeekIndex.value = weekIndex;
};

const startOfMonth = computed(() =>
  dayjs(new Date(currentYear.value, currentMonth.value, 1)).startOf("month")
);

const endOfMonth = computed(() =>
  dayjs(new Date(currentYear.value, currentMonth.value, 1)).endOf("month")
);

const daysMatrix = computed(() => {
  const startOfFirstWeek = startOfMonth.value.startOf("week");
  const endOfLastWeek = endOfMonth.value.endOf("week");
  const days = [];
  let day = startOfFirstWeek;

  while (day <= endOfLastWeek) {
    days.push(day);
    day = day.add(1, "day");
  }

  return Array.from({ length: Math.ceil(days.length / 7) }, (_, i) =>
    days.slice(i * 7, (i + 1) * 7)
  );
});

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

// Events for single date
const eventsForSelectedDate = computed(() => {
  if (!selectedDate.value) {
    return [];
  }

  const formattedSelectedDate = dayjs(selectedDate.value).format("DD/MM/YYYY");

  return allEvents.value.filter((collection) => {
    try {
      const formattedEventDate = updateFormatOfEventDate(collection.eventDate);

      const isSameDay = formattedEventDate === formattedSelectedDate;

      return isSameDay;
    } catch (error) {
      console.error("Error formatting date:", error);
      return false;
    }
  });
});

// Get object events for every day
const eventsForDay = computed(() => {
  const events = {};

  allEvents.value.forEach((collection) => {
    try {
      const formattedEventDate = updateFormatOfEventDate(collection.eventDate);
      if (!events[formattedEventDate]) {
        events[formattedEventDate] = [];
      }
      events[formattedEventDate].push(collection);
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  });
  return events;
});

// Get data about current months and years for CalendarMonthSwitcher.vue
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
          class="calendar-week"
        >
          <div
            v-for="day in week"
            :key="day.format('DD/MM/YYYY')"
            :class="[
              'calendar-day',
              { 'selected-day': day.isSame(selectedDate, 'day') },
            ]"
            @click="selectDate(day, weekIndex)"
          >
            <span class="day-date">{{ day.date() }}</span>
            <span
              v-if="
                eventsForDay[day.format('DD/MM/YYYY')] &&
                eventsForDay[day.format('DD/MM/YYYY')].length > 0
              "
              class="day-date-indicator"
            ></span>
          </div>
          <div
            v-if="
              eventsForSelectedDate.length > 0 &&
              selectedWeekIndex === weekIndex
            "
            class="event-block"
          >
            <h3>
              אירועים עבור
              <span class="date-of-list">
                {{ selectedDate.format("D") }}
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
