<script setup>
import { useCurrentEventStore } from "~/stores/currentEventStore";
// import { BOT_API_URLS } from "~/utils/bot-api-urls";

const { currentEvent } = storeToRefs(useCurrentEventStore());

// const additionalEventsData = ref([]);

onMounted(() => {
  // fetchEventAdditionalData();
});

// BrowseAI ========================== BrowseAI ========================= BrowseAI

// const fetchEventAdditionalData = async () => {
//   const options = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${BOT_API_URLS.ironit.BEARER}`,
//     },
//   };

//   try {
//     const res = await fetch(
//       `${BOT_API_URLS.ironit.URL}/${BOT_API_URLS.ironit.ADDITIONAL_DATA_SCRAPER_ID}/tasks`,
//       options
//     );

//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }

//     const data = await res.json();
//     additionalEventsData.value = data.result.robotTasks.items;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     additionalEventsData.value = "Error fetching data";
//   }
// };

console.log(currentEvent.value);
</script>

<template>
  <div class="single-event-wrapper">
    <h1 v-if="currentEvent.eventTitle" class="title">
      {{ currentEvent.eventTitle }}
    </h1>
    <div class="additional-info">
      <ul>
        <li v-if="currentEvent.eventDate">
          <div class="additional-info-img">
            <NuxtImg src="/images/calendar.png" />
          </div>
          <div class="additional-info-text">
            <span class="additional-info-title">תַאֲרִיך</span>
            <span class="additional-info-description">{{
              currentEvent.eventDate
            }}</span>
          </div>
        </li>
        <li v-if="currentEvent.eventTime">
          <div class="additional-info-img">
            <NuxtImg src="/images/clock.png" />
          </div>
          <div class="additional-info-text">
            <span class="additional-info-title">זְמַן</span>
            <span class="additional-info-description">{{
              currentEvent.eventTime
            }}</span>
          </div>
        </li>

        <li>
          <div class="additional-info-img">
            <NuxtImg src="/images/walet.png" />
          </div>
          <div class="additional-info-text">
            <span class="additional-info-title">עֲלוּת </span>
            <span class="additional-info-description">120</span>
          </div>
        </li>

        <li>
          <div class="additional-info-img">
            <NuxtImg src="/images/label.png" />
          </div>
          <div class="additional-info-text">
            <span class="additional-info-title">תוויות</span>
            <span class="additional-info-description">בזמן</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="img-and-description">
      <div class="event-img">
        <NuxtImg
          v-if="currentEvent.image"
          :src="currentEvent.image"
          alt="event image"
        />
        <NuxtImg
          v-else
          src="https://www.jsconsulting.kz/assets/img/noImg.jpg"
          alt="event image"
        />
      </div>
      <div class="event-main-info">
        <span class="main-info-title">{{ currentEvent.eventTitle }}</span>
        <span class="location">{{ currentEvent.location }}</span>
        <div class="description">
          <span>Event description</span>
        </div>
      </div>
    </div>

    <div class="btn-wrapper">
      <NuxtLink class="back-btn" to="/">חזרה לאירועים</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.single-event-wrapper {
  margin: 20px auto 100px auto;
  display: flex;
  flex-direction: column;
  width: 90%;

  .title {
    text-align: center;
    font-weight: 600;
    color: $blue-200;

    @media (max-width: 768px) {
      font-size: 22px;
    }
  }

  .additional-info {
    padding: 10px;
    border: 1px solid $gray-300;

    @media (max-width: 768px) {
      padding: 5px;
    }

    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      li {
        display: flex;

        .additional-info-img {
          width: 25px;

          @media (max-width: 768px) {
            width: 20px;
          }

          @media (max-width: 768px) {
            width: 15px;
          }

          img {
            width: 100%;
          }
        }

        .additional-info-text {
          span {
            display: block;
            margin-right: 5px;
          }

          .additional-info-title {
            font-weight: 600;
            font-size: 18px;

            @media (max-width: 425px) {
              font-size: 15px;
            }
          }

          .additional-info-description {
            color: $gray-800;

            @media (max-width: 425px) {
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  .img-and-description {
    width: 100%;
    margin: 10px auto 0 auto;
    padding: 40px;
    border: 1px solid $gray-300;
    display: flex;
    justify-content: space-evenly;

    @media (max-width: 768px) {
      padding: 10px;
    }

    @media (max-width: 425px) {
      flex-direction: column;
    }

    .event-img {
      max-width: 350px;

      @media (max-width: 768px) {
        width: 100%;
      }

      img {
        width: 100%;
        height: auto;
      }
    }

    .event-main-info {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      width: 50%;

      @media (max-width: 768px) {
        width: 90%;
        margin: 30px 0 20px 0;
      }

      .main-info-title {
        font-size: 18px;
        font-weight: 600;
        color: $blue-200;
      }

      .description {
        margin-top: 20px;
        font-weight: 300px;
      }
    }
  }

  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    .back-btn {
      padding: 10px 100px;
      border: 1px solid $blue-200;
      color: $blue-200;
      font-size: 18px;

      @media (max-width: 768px) {
        padding: 10px 80px;
        font-weight: 600;
        font-size: 16px;
      }

      &:hover {
        background-color: $blue-200;
        color: $white;
      }
    }
  }
}
</style>
