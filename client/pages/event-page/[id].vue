<script setup>
useHead({
  title: "Pickevent - כל האירועים הישראלים במקום אחד",
  meta: [
    {
      name: "description",
      content: "אתר עם כל אירועי התרבות בישראל",
    },
  ],
});

import { useCurrentEventStore } from "~/stores/currentEventStore";

const { currentEvent } = storeToRefs(useCurrentEventStore());

const additionalSingleEventData = ref(null);
const currentEventOriginalUrl = ref("");
const dataIsLoaded = ref(false);

onMounted(() => {
  loadCurrentEventData();
});

watch(currentEvent, () => {
  loadCurrentEventData();
});

onBeforeUnmount(() => {
  currentEvent.value = {};
});

// Функция для загрузки дополнительных данных события
async function loadCurrentEventData() {
  if (!currentEvent.value?.event_page) return;

  currentEventOriginalUrl.value = currentEvent.value.event_page;

  if (currentEvent.value.site_donor === "custom-event") {
    additionalSingleEventData.value = currentEvent.value;
    dataIsLoaded.value = true;
  } else {
    await fetchEventAdditionalData();
  }
}

function filterByEventPage(dataArray, url) {
  return dataArray.filter((item) => item.inputParameters.originUrl === url);
}

async function fetchEventAdditionalData() {
  if (!currentEvent.value.site_donor) {
    console.error("siteDonor is not defined in currentEvent");
    return;
  }

  const { data, error } = await useFetch(`${API_URL}additional-event-data`, {
    method: "POST",
    body: {
      site_donor: currentEvent.value.site_donor,
      event_page: currentEventOriginalUrl.value,
    },
  });

  if (error.value) {
    console.error("Error fetching additional event data:", error.value);
    return;
  }

  additionalSingleEventData.value = filterByEventPage(
    data.value?.data || [],
    currentEventOriginalUrl.value
  );

  dataIsLoaded.value = true;
}
</script>

<template>
  <div v-if="dataIsLoaded" class="single-event-wrapper">
    <h1 v-if="currentEvent.event_title" class="title">
      {{ currentEvent.event_title }}
    </h1>
    <div class="additional-info">
      <ul>
        <li v-if="currentEvent.event_date">
          <div class="additional-info-img">
            <NuxtImg src="/images/calendar.png" />
          </div>
          <div class="additional-info-text">
            <span class="additional-info-title">תַאֲרִיך</span>
            <span class="additional-info-description">{{
              currentEvent.event_date
            }}</span>
          </div>
        </li>
        <li v-if="currentEvent.event_time">
          <div class="additional-info-img">
            <NuxtImg src="/images/clock.png" />
          </div>
          <div class="additional-info-text">
            <span class="additional-info-title">זְמַן</span>
            <span class="additional-info-description">{{
              currentEvent.event_time
            }}</span>
          </div>
        </li>

        <li
          v-if="
            currentEvent.event_price ||
            additionalSingleEventData[0]?.capturedTexts?.event_price
          "
        >
          <div class="additional-info-img">
            <NuxtImg src="/images/walet.png" />
          </div>
          <div class="additional-info-text">
            <span class="additional-info-title">עֲלוּת </span>
            <span class="additional-info-description">{{
              currentEvent.event_price ||
              additionalSingleEventData[0].capturedTexts.event_price
            }}</span>
          </div>
        </li>

        <!-- <li>
          <div class="additional-info-img">
            <NuxtImg src="/images/label.png" />
          </div>
          <div class="additional-info-text">
            <span class="additional-info-title">תוויות</span>
            <span class="additional-info-description">בזמן</span>
          </div>
        </li> -->
      </ul>
    </div>

    <div class="img-and-description">
      <div class="event-img">
        <img
          v-if="
            currentEvent.event_image_blob ||
            currentEvent.event_image_url ||
            additionalSingleEventData[0]?.capturedTexts?.eventImage
          "
          :src="
            currentEvent.event_image_blob ||
            currentEvent.event_image_url ||
            additionalSingleEventData[0].capturedTexts.eventImage
          "
          alt="event image"
        />
        <NuxtImg v-else src="/images/logo.svg" alt="event image" />

        <div
          v-if="
            currentEvent.event_page ||
            additionalSingleEventData[0].inputParameters.originUrl
          "
          class="btn-wrapper"
        >
          <NuxtLink
            class="action-btn"
            target="_blank"
            :to="
              currentEvent.event_page ||
              additionalSingleEventData[0].inputParameters.originUrl
            "
            >לרכישת כרטיסים</NuxtLink
          >
        </div>
      </div>
      <div class="event-main-info">
        <span v-if="currentEvent.event_title" class="main-info-title">{{
          currentEvent.event_title
        }}</span>
        <span v-if="currentEvent.location" class="location">{{
          currentEvent.location
        }}</span>
        <div
          v-if="
            currentEvent.event_description ||
            additionalSingleEventData[0].capturedTexts.eventDescription
          "
          class="description"
        >
          <div
            v-html="
              currentEvent.event_description ||
              additionalSingleEventData[0].capturedTexts.eventDescription
            "
          ></div>
        </div>
      </div>
    </div>

    <div class="btn-wrapper">
      <a class="back-btn" @click="$router.go(-1)">חזרה לאירועים</a>
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
    background: $white;
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
    background: white;
    justify-content: space-evenly;

    @media (max-width: 768px) {
      padding: 10px;
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

    .btn-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40px;

      .action-btn {
        padding: 10px 100px;
        background-color: $blue-200;
        color: $white;
        font-size: 18px;

        @media (max-width: 768px) {
          padding: 10px 80px;
          font-weight: 600;
          font-size: 16px;
        }

        &:hover {
          color: $gray-300;
        }
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
      background-color: $white;
      cursor: pointer;

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
