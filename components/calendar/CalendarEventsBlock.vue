<script setup>
const props = defineProps({
  singleDataEvents: Object,
});

import { useCurrentEventStore } from "~/stores/currentEventStore";
const { currentEvent } = storeToRefs(useCurrentEventStore());

function recordEventToStore(event) {
  currentEvent.value = event;

  //get the site from which we will get data for the event additional page
  if (currentEvent.value.eventPage.includes("ironit")) {
    currentEvent.value.siteDonor = "ironit";
  } else if (currentEvent.value.eventPage.includes("mishkan-ashdod")) {
    currentEvent.value.siteDonor = "mishkanAshdod";
  }
}
</script>

<template>
  <div class="event-list">
    <div
      v-for="event in props.singleDataEvents"
      :key="event"
      class="single-event"
      @click="recordEventToStore(event)"
    >
      <NuxtLink :to="'/event-page/' + event.Position" class="single-event-link">
        <div class="event-img">
          <NuxtImg
            v-if="event.image"
            :src="event.image"
            :alt="event.eventAltText"
          />
          <NuxtImg
            v-else
            src="https://www.jsconsulting.kz/assets/img/noImg.jpg"
            alt="image"
          />
        </div>
        <div class="event-date">
          <span v-if="event.eventDate" class="date">
            {{ event.eventDate }}</span
          >
          <span class="time">
            <NuxtImg src="/images/clock.png" alt="clock" />
            {{ event.eventTime }}
          </span>
          <span v-if="event.location" class="location">{{
            event.location
          }}</span>
          <span v-if="event.eventTitle" class="title">{{
            event.eventTitle
          }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.event-list {
  .single-event {
    cursor: pointer;
    border-bottom: 1px solid $gray-150;
    padding: 20px;

    &:hover {
      background-color: $blue-300;
    }

    @media (max-width: 768px) {
      padding: 20px 0;
    }
    .single-event-link {
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
  }
}
</style>
