<script setup>
const props = defineProps({
  singleDataEvents: Object,
});

import { useCurrentEventStore } from "~/stores/currentEventStore";
const { currentEvent } = storeToRefs(useCurrentEventStore());

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
  <div class="event-list">
    <div
      v-for="event in props.singleDataEvents"
      :key="event"
      class="single-event"
    >
      <div class="single-event-wrapper">
        <div class="event-img">
          <img
            v-if="event.event_image_url || event.event_image_blob"
            :src="event.event_image_url || event.event_image_blob"
            :alt="event.eventAltText"
          />
          <NuxtImg v-else src="/images/logo.png" alt="image" />
        </div>
        <div class="event-date">
          <span v-if="event.event_date" class="date">
            {{ event.event_date }}</span
          >
          <span class="time">
            <NuxtImg src="/images/clock.png" alt="clock" />
            {{ event.event_time }}
          </span>
          <span v-if="event.location" class="location">{{
            event.location
          }}</span>
          <span v-if="event.event_title" class="title">{{
            event.eventTitle
          }}</span>
        </div>
      </div>
      <div class="btn-wrapper">
        <NuxtLink
          :to="event.eventPage"
          class="buy-ticckets-link"
          target="_blank"
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
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.event-list {
  .single-event {
    border-bottom: 1px solid $gray-150;
    padding: 20px;

    &:hover {
      background-color: $blue-300;
    }

    @media (max-width: 768px) {
      padding: 20px 0;
    }
    .single-event-wrapper {
      display: flex;

      .event-img {
        max-width: 150px;

        @media (max-width: 768px) {
          max-width: 120px;
        }

        img {
          width: 100%;
          height: auto;
        }
      }

      .event-date {
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
    }

    .btn-wrapper {
      display: flex;

      @media (max-width: 768px) {
        flex-direction: column;
        width: 240px;
      }

      a {
        padding: 10px 80px;
        margin-left: 10px;
        margin-top: 10px;
        font-size: 18px;
        text-align: center;

        @media (max-width: 768px) {
          font-weight: 600;
          font-size: 16px;
        }

        @media (max-width: 425px) {
          font-size: 14px;
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
}
</style>
