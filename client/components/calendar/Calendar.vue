<script setup>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";

import { useAllEventsStore } from "~/stores/allEventsStore";
import { useSelectedDate } from "~/stores/calendarStore";

const {
  allEvents,
  sortedByDateEventsCollection,
  currentFilteredEventCollection,
} = storeToRefs(useAllEventsStore());

const { selectedDate } = storeToRefs(useSelectedDate());

import { daysOfWeek, monthsInHebrew } from "~/utils/collections";
import { fetchPageData } from "~/utils/data-acquisition";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const currentMonth = ref(dayjs().month());
const currentYear = ref(dayjs().year());

const selectedWeekIndex = ref(null);

const weekRefs = ref([]);

const dataIsLoaded = ref(false);

const { data: events, error } = await useFetch(`${API_URL}all-events`);

onMounted(async () => {
  const backendEvents = events.value;
  console.log(backendEvents);

  try {
    allEvents.value = backendEvents;

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
    }
  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});

watch([currentMonth, currentYear], ([newMonth, newYear]) => {
  sessionStorage.setItem("selectedMonth", newMonth);
  sessionStorage.setItem("selectedYear", newYear);
});

watch([selectedDate, selectedWeekIndex], ([newDate, newWeekIndex]) => {
  if (newDate) {
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

// Past date
const isPastDate = (date) => {
  return dayjs(date).isBefore(dayjs(), "day");
};

// Get actual event collection for the view according to sortedByDateEventsCollection
const actualityCollection = computed(() => {
  return currentFilteredEventCollection.value.length > 0
    ? currentFilteredEventCollection.value
    : sortedByDateEventsCollection.value;
});

const selectDate = (date, weekIndex) => {
  if (
    selectedDate.value &&
    dayjs.isDayjs(selectedDate.value) &&
    selectedDate.value.isSame(date, "day") &&
    selectedWeekIndex.value === weekIndex
  ) {
    selectedDate.value = null;
    selectedWeekIndex.value = null;
  } else {
    selectedDate.value = date;
    selectedWeekIndex.value = weekIndex;
  }
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

const isPreviousMonthAvailable = computed(() => {
  const currentDate = dayjs();
  const selectedDate = dayjs(new Date(currentYear.value, currentMonth.value));
  return selectedDate.isAfter(currentDate, "month");
});

const eventsForSelectedDate = computed(() => {
  if (!selectedDate.value) {
    return [];
  }

  // Преобразуем selectedDate.value в объект dayjs, если он им не является
  const selectedDateObj = dayjs(selectedDate.value);
  const selectedDateString = selectedDateObj.format("YYYY-MM-DD");

  return actualityCollection.value.filter((collection) => {
    try {
      // Преобразуем дату события в нужный формат
      const eventDate = dayjs(collection.event_date).format("YYYY-MM-DD");

      // Сравниваем даты как строки в формате "YYYY-MM-DD"
      const isSameDay = eventDate === selectedDateString;

      return isSameDay;
    } catch (error) {
      console.error("Error comparing dates:", error);
      return false;
    }
  });
});

const eventsForDay = computed(() => {
  const events = {};

  actualityCollection.value.forEach((collection) => {
    try {
      const eventDate = collection.event_date;

      // Проверяем, есть ли уже массив событий для этой даты, и если нет, создаем его
      if (!events[eventDate]) {
        events[eventDate] = [];
      }

      // Добавляем событие в массив для соответствующей даты
      events[eventDate].push(collection);
    } catch (error) {
      console.error("Error processing event date:", error);
    }
  });

  return events;
});

// Get data about current months and years for calendarMonthSwitcher.vue
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
            <span class="day-date">{{ dayObj.date.date() }}</span>
            <span
              v-if="
                eventsForDay[dayObj.date.format('YYYY-MM-DD')] &&
                eventsForDay[dayObj.date.format('YYYY-MM-DD')].length > 0
              "
              class="day-date-indicator"
            ></span>
          </div>
          <div
            v-if="
              eventsForSelectedDate.length > 0 &&
              selectedWeekIndex === weekIndex &&
              selectedDate &&
              selectedDate.month() === currentMonth
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
