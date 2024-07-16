<script setup>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import { daysOfWeek } from "~/utils/collections";
import { events } from "~/utils/events-data";
import { BOT_API_URLS } from "~/utils/bot-api-urls";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const currentMonth = ref(dayjs().month());
const currentYear = ref(dayjs().year());
const selectedDate = ref({});

// BrowseAI ========================== BrowseAI ========================= BrowseAI
const responseA = ref("");
const ironitsData = ref([]);

const fetchData = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer 8b8eca14-db37-4afc-b7b6-a0f07f2fb9ac:0453c0cf-ac6f-4917-bce4-fcbbe0d2f196",
    },
  };

  try {
    const res = await fetch(
      "https://api.browse.ai/v2/robots/e3415206-2e2b-4742-b6e6-ee6276c3e619/tasks/fa6e6ff7-c4e8-48d9-a547-c259159d0cc1",
      options
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Full response data:", data);

    const items = data.result.robotTasks.items;
    console.log("Items:", items);

    if (
      items.length > 0 &&
      items[0].capturedLists &&
      items[0].capturedLists["ironits-data"]
    ) {
      ironitsData.value = items[0].capturedLists["ironits-data"];
      responseA.value = JSON.stringify(ironitsData.value, null, 2);
    } else {
      responseA.value = "ironits-data not found";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    responseA.value = "Error fetching data";
  }
};

// const responseB = ref("");
// const capturedTextsData = ref({});

// const fetchEventData = async () => {
//   const options = {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Bearer 8b8eca14-db37-4afc-b7b6-a0f07f2fb9ac:0453c0cf-ac6f-4917-bce4-fcbbe0d2f196",
//     },
//   };

//   try {
//     const res = await fetch(
//       "https://api.browse.ai/v2/robots/2988e6ca-467e-4980-b7b0-77fc0fc89c59/tasks",
//       options
//     );

//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }

//     const data = await res.json();
//     console.log("Full response data:", data);

//     const items = data.result.robotTasks.items;
//     console.log("Items:", items);

//     if (items.length > 0 && items[0].capturedTexts) {
//       capturedTextsData.value = items[0].capturedTexts;
//       responseB.value = JSON.stringify(capturedTextsData.value, null, 2);
//     } else {
//       responseB.value = "capturedTexts not found";
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     responseB.value = "Error fetching data";
//   }
// };

onMounted(() => {
  fetchData();
  // fetchEventData();
});

// ==================================================================

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

const selectedWeekIndex = ref(null);

const selectDate = (date, weekIndex) => {
  selectedDate.value = date;
  selectedWeekIndex.value = weekIndex;
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

// Get data about current months and years for CalendarMonthSwitcher.vue
const calendarMonthSwitcherData = {
  currentMonthAndYear: computed(() =>
    dayjs(new Date(currentYear.value, currentMonth.value)).format("MMMM YYYY")
  ),
  previousMonth: computed(() =>
    dayjs(new Date(currentYear.value, currentMonth.value))
      .subtract(1, "month")
      .format("MMMM")
  ),
  nextMonth: computed(() =>
    dayjs(new Date(currentYear.value, currentMonth.value))
      .add(1, "month")
      .format("MMMM")
  ),
};
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
            :key="day.format('YYYY-MM-DD')"
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
                {{ selectedDate.format("MMMM D") }}
              </span>
            </h3>
            <hr />
            <CalendarEventsBlock :single-data-events="eventsForSelectedDate" />
          </div>
        </div>
      </div>
    </div>

    <div class="data-from the bot">
      <!-- {{ responseB }} -->
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
