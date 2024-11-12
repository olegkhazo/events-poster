<script setup>
import { useCurrentEventStore } from "~/stores/currentEventStore";
const props = defineProps({
  singleEventData: Object,
});

const { currentEvent } = storeToRefs(useCurrentEventStore());
const event = props.singleEventData;

function recordEventToStore(event) {
  currentEvent.value = event;

  // Get the site from which we will get data for the event additional page
  if (currentEvent.value.event_page.includes("ironit")) {
    currentEvent.value.site_donor = "ironit";
  } else if (currentEvent.value.event_page.includes("mishkan-ashdod")) {
    currentEvent.value.site_donor = "mishkanAshdod";
  } else if (currentEvent.value.event_page.includes("mevalim")) {
    currentEvent.value.site_donor = "mevalim";
  } else {
    currentEvent.value.site_donor = "custom-event";
  }
}
</script>

<template>
  <div class="single-event">
    <div class="event-img">
      <img
        v-if="event.event_image_blob || event.event_image_url"
        :src="event.event_image_blob || event.event_image_url"
        :alt="event.eventAltText"
      />
      <NuxtImg v-else src="/images/logo.svg" alt="image" />
    </div>
    <div class="event-description">
      <span v-if="event.event_date" class="date">{{ event.event_date }}</span>
      <span v-if="event.event_time" class="time">
        <NuxtImg src="/images/clock.png" alt="clock" />
        {{ event.event_time }}
      </span>
      <span v-if="event.location" class="location">{{ event.location }}</span>
      <span v-if="event.event_title" class="title">
        {{ event.event_title }}
      </span>
    </div>

    <div class="btn-wrapper">
      <NuxtLink :to="event.event_page" class="buy-ticckets-link" target="_blank"
        >לרכישה</NuxtLink
      >

      <NuxtLink
        @click="recordEventToStore(event)"
        :to="'/event-page/' + event._id"
        class="additional-info-link"
        >מידע נוסף</NuxtLink
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.single-event {
  display: flex;
  flex-direction: column;
  width: 250px;
  padding-bottom: 15px;
  cursor: pointer;
  position: relative;
  height: 100%;

  &:hover {
    background-color: $blue-300;
  }

  @media (max-width: 768px) {
    width: 100%;
    background-color: $blue-300;
    border: none;
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 1px solid $gray-150;
    padding: 20px;
    padding: 20px 0;
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }

  .event-img {
    max-width: 100%;

    @media (max-width: 768px) {
      max-width: 150px;
      margin-right: 20px;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  .event-description {
    flex: 1; /* Занимаем все оставшееся пространство */
    margin-right: 20px;

    span {
      display: block;
    }

    .date {
      color: $blue-200;
      font-weight: 500;

      @media (max-width: 768px) {
        font-size: 8px;
      }
    }

    .time {
      color: $blue-200;
      font-weight: 300;

      @media (max-width: 768px) {
        font-size: 8px;
      }

      img {
        width: 10px;

        @media (max-width: 768px) {
          width: 8px;
        }
      }
    }

    .title {
      font-size: 16px;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 14px;
        font-weight: 500;
      }
    }

    .location {
      margin-top: 10px;
      font-size: 12px;

      @media (max-width: 768px) {
        font-size: 10px;
        font-weight: 300;
      }
    }
  }

  .btn-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    margin-top: auto; /* Закрепляем снизу */

    @media (max-width: 768px) {
      width: 230px;
    }

    a {
      padding: 10px 80px;
      margin-top: 10px;
      font-size: 14px;
      text-align: center;

      @media (max-width: 768px) {
        font-weight: 600;
      }

      @media (max-width: 425px) {
        padding: 10px 30px;
      }
    }

    .additional-info-link {
      border: 1px solid $blue-200;
      color: $blue-200;
      background-color: $white;

      &:hover {
        color: $gray-700;
      }
    }

    .buy-ticckets-link {
      background-color: $blue-200;
      color: $white;

      &:hover {
        color: $gray-300;
      }
    }
  }
}
</style>
