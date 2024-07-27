<script setup>
import { ref, onMounted, computed } from "vue";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import { daysOfWeek, monthsInHebrew } from "~/utils/collections";
import { BOT_API_URLS } from "~/utils/bot-api-urls";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const currentMonth = ref(dayjs().month());
const currentYear = ref(dayjs().year());

const selectedDate = ref({});
const selectedWeekIndex = ref(null);

const ironitEventsCollection = ref([]);
const mishkanAshdodEventsCollection = ref([]);
const concantinatedEventsArray = ref([]);

onMounted(() => {
  fetchMainIronitPageData();
  fetchMishkanAsdodData();
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
  const startOfFirstWeek = startOfMonth.value.startOf("week"); // Начало недели - воскресенье
  const endOfLastWeek = endOfMonth.value.endOf("week"); // Конец недели - суббота
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

function updateFormatOfEventDate(eventData) {
  const splitDate = eventData.split(" ");
  const datePart = splitDate.slice(-1)[0];

  // Check the string format for DD/MM/YYYY
  const slashDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  // Check the string format for DD.MM.YYYY
  const dotDateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

  if (slashDateRegex.test(datePart)) {
    return datePart;
  } else if (dotDateRegex.test(datePart)) {
    // Convert DD.MM.YYYY to DD/MM/YYYY
    return datePart.replace(/\./g, "/");
  } else {
    console.error("Invalid date format in eventData: " + eventData);
    throw new Error("Invalid date format in eventData: " + eventData);
  }
}

const eventsForSelectedDate = computed(() => {
  if (!selectedDate.value) {
    return [];
  }

  const formattedSelectedDate = dayjs(selectedDate.value).format("DD/MM/YYYY");

  return concantinatedEventsArray.value.filter((collection) => {
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

// BrowseAI ========================== BrowseAI ========================= BrowseAI

// Get Ironit data from the main page
const fetchMainIronitPageData = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BOT_API_URLS.ironit.API_KEY}`,
    },
  };

  try {
    const res = await fetch(
      `${BOT_API_URLS.ironit.URL}/${BOT_API_URLS.ironit.MAIN_PAGE_SCRAPER_ID}/tasks/${BOT_API_URLS.ironit.MAIN_PAGE_SCRAPER_TASK_KEY}`,
      options
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    ironitEventsCollection.value = data.result.capturedLists.Events.map(
      (event) => {
        const formattedEventDate = updateFormatOfEventDate(event.eventDate);

        return { ...event, eventDate: formattedEventDate };
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    ironitEventsCollection.value = "Error fetching data";
  }
};

const fetchMishkanAsdodData = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BOT_API_URLS.mishkanAshdod.API_KEY}`,
    },
  };

  try {
    const res = await fetch(
      `${BOT_API_URLS.ironit.URL}/${BOT_API_URLS.mishkanAshdod.MAIN_PAGE_SCRAPER_ID}/tasks/${BOT_API_URLS.mishkanAshdod.MAIN_PAGE_SCRAPER_TASK_KEY}`,
      options
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    mishkanAshdodEventsCollection.value = data.result.capturedLists.Events;

    mishkanAshdodEventsCollection.value.shift();

    mishkanAshdodEventsCollection.value.map((event) => {
      const formattedEventDate = updateFormatOfEventDate(event.eventDate);

      return { ...event, eventDate: formattedEventDate };
    });
    concantinatedEventsArray.value = [
      ...mishkanAshdodEventsCollection.value,
      ...ironitEventsCollection.value,
    ];
  } catch (error) {
    console.error("Error fetching data:", error);
    mishkanAshdodEventsCollection.value = "Error fetching data";
  }
};
// BrowseAI ========================== BrowseAI ========================= BrowseAI
</script>

<template>
  <div class="calendar-wrapper">
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
            <span class="day-date-indicator"></span>
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
